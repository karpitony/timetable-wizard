import { Course, Schedule, DayOfWeek } from "@/types/data";

export type RawCourseItem = {
  SBJ_NO: string,
  SBJ_NM: string,
  CPDIV_CD: string | null,
  DNN_CD: string | null,
  ALL_FULL_PCNT: number | null,
  SBJ_DIV: string | null,
  OPEN_SEM_CD: string | null,
  TMTBL_DSC: string | null,
  DETL_CURI_CD: string | null,
  OPEN_DPTMJR_CD_NM: string | null,
  CDT: string | null,
  OPEN_ORGN_CLSF_CD: string | null,
  ROOM_DSC: string | null,
  OPEN_YY: string | null,
  SCHGRD: string | null,
  REMK: string | null,
  OPEN_DPTMJR_CD: string | null,
  TCHR_DSC: string | null,
  DVCLS: string | null,
  TKCRS_PCNT: number,
};

const dayMap: Record<string, DayOfWeek> = {
  월: '월', 화: '화', 수: '수', 목: '목', 금: '금', 토: '토'
};

function toMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function parseSchedule(timetable: string): Schedule[] {
  const schedules: Schedule[] = [];
  if (!timetable) return schedules;

  // 시간 구간이 포함된 패턴 전체 추출
  const pattern = /((?:[월화수목금토],?\s*)+)\s*(\d+(?:\.\d+)?)교시\((\d{1,2}:\d{2})\)\s*~\s*(\d+(?:\.\d+)?)교시\((\d{1,2}:\d{2})\)/g;
  const matches = [...timetable.matchAll(pattern)];

  for (const match of matches) {
    const [, dayStr, periodStart, startTime, periodEnd, endTime] = match;

    // 쉼표로 나눠 복수 요일 추출
    const days = dayStr.split(/,\s*/).map(d => d.trim()).filter(Boolean);

    for (const day of days) {
      const dayOfWeek = dayMap[day];
      if (!dayOfWeek) continue;

      schedules.push({
        day: dayOfWeek,
        startMinutes: toMinutes(startTime),
        endMinutes: toMinutes(endTime),
        periodStart,
        periodEnd,
      });
    }
  }

  return schedules;
}

export function parseRawCourse(raw: RawCourseItem): Course {
  return {
    id: `${raw.SBJ_NO}-${raw.DVCLS}`,
    sbjNo: raw.SBJ_NO,
    sbjName: raw.SBJ_NM,
    instructor: raw.TCHR_DSC || '',
    location: raw.ROOM_DSC || '',
    timeSlots: parseSchedule(raw.TMTBL_DSC ?? ""),
    fullParticipant: raw.ALL_FULL_PCNT ?? undefined,
    currentParticipant: raw.TKCRS_PCNT ?? undefined,
  };
}

// 테스트 케이스
// const testCases: string[] = [
//   "화, 목 7교시(15:00) ~ 8교시(16:30)",
//   "월 4교시(12:00) ~ 5교시(13:30), 수 3교시(11:00) ~ 4교시(12:30)",
//   "월 3교시(11:00) ~ 4.5교시(13:00), 월 5.5교시(13:30) ~ 6.5교시(15:00), 수 4.5교시(12:30) ~ 5.5교시(14:00)"
// ];

// testCases.forEach((input, idx) => {
//   const result = parseSchedule(input);
//   console.log(`\n[CASE ${idx + 1}] "${input}"`);
//   console.dir(result, { depth: null });
// });