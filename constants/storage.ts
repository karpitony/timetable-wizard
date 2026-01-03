export const LAST_UPDATE: Date = new Date('2025-01-04T00:00:00Z');

// parsedData.json 캐싱 관련 상수
export const CACHE_VERSION = LAST_UPDATE.toISOString();
export const CACHE_KEY = `courses@2026-1@v${CACHE_VERSION}`;
export const CACHE_TTL = 1000 * 60 * 60; // 1시간

// 시간표 & 경쟁률 즐겨찾기 결과 저장 상수
export const DB_NAME = 'TimetableDB';
export const DB_VERSION = 3;
export const GROUP_STORE = 'groups@2026-1';
export const TIMETABLE_STORE = 'timetables@2026-1';
export const MY_COURSE_COMPETITION_STORE = 'myCourseCompetition@2026-1';
