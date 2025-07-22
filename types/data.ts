export type DayOfWeek =  '월' | '화' | '수' | '목' | '금' | '토'; // 요일

export type Schedule = {
  day: DayOfWeek;
  startMinutes: number; // ex: 720 = 12:00
  endMinutes: number;   // ex: 810 = 13:30
  periodStart?: string; // 교시
  periodEnd?: string;
};

export type Course = {
  id: string;                   // ex. "BIS2001-01"
  sbjNo: string;                // 학수번호: "BIS2001"
  sbjName: string;              // 과목명: "불교학입문"
  instructor: string;           // 교수명
  location: string;             // 강의실
  timeSlots: Schedule[];        // 배열로, 월수 2회 수업 등
  fullParticipant?: number;     // 전체 수강신청 가능 인원
  currentParticipant?: number;  // 현재 수강신청 인원
};

export type CourseGroup = Course[];