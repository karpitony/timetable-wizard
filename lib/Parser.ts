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

  // 1. 요일 추출
  const dayMatches = timetable.match(/[월화수목금토]/g);
  if (!dayMatches) return schedules;

  // 2. 시간 추출
  const timeRegex = /(\d+(?:\.\d+)?)교시\((\d{1,2}:\d{2})\)\s*~\s*(\d+(?:\.\d+)?)교시\((\d{1,2}:\d{2})\)/;
  const timeMatch = timetable.match(timeRegex);

  if (!timeMatch) return schedules; // 시간 정보 없으면 빈 배열 리턴

  const [, periodStart, startTime, periodEnd, endTime] = timeMatch;

  dayMatches.forEach((day) => {
    const dayOfWeek = dayMap[day];
    if (!dayOfWeek) return;

    schedules.push({
      day: dayOfWeek,
      startMinutes: toMinutes(startTime),
      endMinutes: toMinutes(endTime),
      periodStart,
      periodEnd,
    });
  });

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
  };
}

// 사용 예시
// const rawData = [
//   {
//     SBJ_NO: "BIS2001",
//     SBJ_NM: "불교학입문",
//     CPDIV_CD: "전공",
//     DNN_CD: "주간",
//     ALL_FULL_PCNT: 50,
//     SBJ_DIV: null,
//     OPEN_SEM_CD: "CM160.10",
//     TMTBL_DSC: "월, 수 4교시(12:00) ~ 5교시(13:30)",
//     DETL_CURI_CD: "기초",
//     OPEN_DPTMJR_CD_NM: "불교대학 불교학부",
//     CDT: "3.0",
//     OPEN_ORGN_CLSF_CD: "CM015.110",
//     ROOM_DSC: "B259(법학/만해관 303-201 강의실_스마트)",
//     OPEN_YY: "2025",
//     SCHGRD: "1학년",
//     REMK: "팀티칭",
//     OPEN_DPTMJR_CD: "DS031201",
//     TCHR_DSC: "신성현",
//     DVCLS: "01",
//     TKCRS_PCNT: 6
//   },
// ];

// const courses: Course[] = rawData.map(parseRawCourse);
// console.dir(courses, { depth: null, colors: true });