type Schedule = {
  day: string;
  startPeriod: string | null;
  startTime: string | null;
  endPeriod: string | null;
  endTime: string | null;
};

function parseTimetable(timetable: string): Schedule[] {
  const dayMap: { [key: string]: string } = {
    "월": "Monday",
    "화": "Tuesday",
    "수": "Wednesday",
    "목": "Thursday",
    "금": "Friday",
    "토": "Saturday",
    "일": "Sunday",
  };

  const schedules: Schedule[] = [];

  // 정규식을 사용하여 문자열을 분리
  const regex = /([월화수목금토일]+)\s?(\d+(?:\.\d+)?교시\((\d{1,2}:\d{2})\))?\s?~\s?(\d+(?:\.\d+)?교시\((\d{1,2}:\d{2})\))?/g;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(timetable)) !== null) {
    const days = match[1];
    const startPeriod = match[2] ? match[2].split("교시")[0] : null;
    const startTime = match[3] || null;
    const endPeriod = match[4] ? match[4].split("교시")[0] : null;
    const endTime = match[5] || null;

    // 요일을 개별적으로 분리
    days.split(/[, ]/).forEach((day) => {
      const trimmedDay = day.trim();
      if (trimmedDay) {
        schedules.push({
          day: dayMap[trimmedDay] || trimmedDay,
          startPeriod,
          startTime,
          endPeriod,
          endTime,
        });
      }
    });
  }

  return schedules;
}

// 테스트
const timetable1 = "월 4교시(12:00) ~ 5교시(13:30), 수 3교시(11:00) ~ 4교시(12:30)";
const timetable2 = "월, 수 4교시(12:00) ~ 5교시(13:30)";
const timetable3 = "화, 목 4교시(12:00) ~ 5교시(13:30)";
const timetable4 = "토 5교시(13:00) ~ 7.5교시(16:00)";
const timetable5 = "화, 목"; // null 처리

console.log(parseTimetable(timetable1));
console.log(parseTimetable(timetable2));
console.log(parseTimetable(timetable3));
console.log(parseTimetable(timetable4));
console.log(parseTimetable(timetable5));