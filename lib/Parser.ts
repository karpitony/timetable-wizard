import { Course, Schedule, DayOfWeek } from '@/types/data';
import { RawClassTimetable, RawCourseItem } from '@/types/raw-data';

const dayMap: Record<string, DayOfWeek> = {
  월: '월',
  화: '화',
  수: '수',
  목: '목',
  금: '금',
  토: '토',
};

function toMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function parseSchedule(timetable: string): Schedule[] {
  const schedules: Schedule[] = [];
  if (!timetable) return schedules;

  // 시간 구간이 포함된 패턴 전체 추출
  const pattern =
    /((?:[월화수목금토],?\s*)+)\s*(\d+(?:\.\d+)?)교시\((\d{1,2}:\d{2})\)\s*~\s*(\d+(?:\.\d+)?)교시\((\d{1,2}:\d{2})\)/g;
  const matches = [...timetable.matchAll(pattern)];

  for (const match of matches) {
    const [, dayStr, periodStart, startTime, periodEnd, endTime] = match;

    // 쉼표로 나눠 복수 요일 추출
    const days = dayStr
      .split(/,\s*/)
      .map(d => d.trim())
      .filter(Boolean);

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

function parseDCS(dsc: string): Schedule[] {
  if (!dsc) return [];

  /**
   * 월 10:00-12:00
   * 월요일 10:00-12:00
   */
  const pattern = /(월|화|수|목|금|토)(?:요일)?[^0-9]*(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/g;

  const schedules: Schedule[] = [];
  const matches = [...dsc.matchAll(pattern)];

  for (const match of matches) {
    const [, day, start, end] = match;

    schedules.push({
      day: day as DayOfWeek,
      startMinutes: toMinutes(start),
      endMinutes: toMinutes(end),
    });
  }

  return schedules;
}

interface CourseAdapter<T> {
  toCourse(raw: T): Course;
}

const RawCourseItemAdapter: CourseAdapter<RawCourseItem> = {
  toCourse(raw) {
    return {
      id: `${raw.SBJ_NO}-${raw.DVCLS}`,
      sbjNo: raw.SBJ_NO,
      sbjName: raw.SBJ_NM,
      instructor: raw.TCHR_DSC || '',
      location: raw.ROOM_DSC || '',
      timeSlots: parseSchedule(raw.TMTBL_DSC ?? '') || [],
      fullParticipant: raw.ALL_FULL_PCNT ?? undefined,
      currentParticipant: raw.TKCRS_PCNT ?? undefined,
      memo: raw.REMK || null,
    };
  },
};

const ClassTimetableAdapter: CourseAdapter<RawClassTimetable> = {
  toCourse(raw) {
    return {
      id: `${raw.SBJ_NO}-${raw.DVCLS}`,
      sbjNo: raw.SBJ_NO,
      sbjName: raw.SBJ_NM,
      instructor: raw.PROF_KOR_DSC || '',
      location: raw.ROOM_NM,
      timeSlots: parseDCS(raw.DSC),
      fullParticipant: raw.ALL_FULL_PCNT ?? undefined,
      currentParticipant: raw.TKCRS_PCNT ?? undefined,
      memo: raw.REMK_DSC || null,
    };
  },
};

export function parseRawCourse(raw: RawCourseItem): Course {
  return {
    id: `${raw.SBJ_NO}-${raw.DVCLS}`,
    sbjNo: raw.SBJ_NO,
    sbjName: raw.SBJ_NM,
    instructor: raw.TCHR_DSC || '',
    location: raw.ROOM_DSC || '',
    timeSlots: parseSchedule(raw.TMTBL_DSC ?? '') || [],
    fullParticipant: raw.ALL_FULL_PCNT ?? undefined,
    currentParticipant: raw.TKCRS_PCNT ?? undefined,
    memo: raw.REMK || null,
  };
}

type AnyRaw = RawCourseItem | RawClassTimetable;

function isRawClassTimetable(raw: AnyRaw): raw is RawClassTimetable {
  return 'PROF_KOR_DSC' in raw && 'DSC' in raw;
}

export function mapToCourse(raw: AnyRaw): Course {
  if (isRawClassTimetable(raw)) {
    return ClassTimetableAdapter.toCourse(raw);
  }
  return RawCourseItemAdapter.toCourse(raw);
}
