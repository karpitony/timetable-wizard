function dateFromKST(y: number, m: number, d: number, h = 0, min = 0, s = 0) {
  return new Date(Date.UTC(y, m - 1, d, h - 9, min, s));
}

export const LAST_UPDATE = dateFromKST(2026, 1, 14, 16, 12, 0); // 2026년 1월 14일 16시 12분 KST
export const LAST_UPDATE_STRING: string = LAST_UPDATE.toISOString();

// parsedData.json 캐싱 관련 상수
export const CACHE_VERSION = LAST_UPDATE_STRING;
export const CACHE_KEY = `courses@2026-1@v${CACHE_VERSION}`;
export const CACHE_TTL = 1000 * 60 * 60; // 1시간

// 시간표 & 경쟁률 즐겨찾기 결과 저장 상수
export const DB_NAME = 'TimetableDB';
export const DB_VERSION = 3;
export const GROUP_STORE = 'groups@2026-1';
export const TIMETABLE_STORE = 'timetables@2026-1';
export const MY_COURSE_COMPETITION_STORE = 'myCourseCompetition@2026-1';
