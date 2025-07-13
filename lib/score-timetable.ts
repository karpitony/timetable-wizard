import { Schedule } from "@/types/data";

type Timetable = Schedule[][]; // 여러 과목의 시간 배열 모음

export function scoreTimetable(timetable: Timetable): number {
  // 1. 공강 체크
  const allDays = ['월','화','수','목','금','토'];
  const daysWithClass = new Set<string>();
  timetable.forEach(courseSlots => {
    courseSlots.forEach(slot => daysWithClass.add(slot.day));
  });
  const freeDays = allDays.filter(d => !daysWithClass.has(d));
  let score = freeDays.length * 5;

  // 2. 수업 시작/종료 시간 범위 계산
  let earliestStart = 24*60;
  let latestEnd = 0;
  let continuousPenalty = 0;

  // 요일별로 모으기
  const dayMap = new Map<string, Schedule[]>();
  timetable.forEach(courseSlots => {
    courseSlots.forEach(slot => {
      if (!dayMap.has(slot.day)) dayMap.set(slot.day, []);
      dayMap.get(slot.day)!.push(slot);
    });
  });

  for (const [day, slots] of dayMap.entries()) {
    slots.sort((a,b) => a.startMinutes - b.startMinutes);

    earliestStart = Math.min(earliestStart, slots[0].startMinutes);
    latestEnd = Math.max(latestEnd, slots[slots.length-1].endMinutes);

    // 연강 체크
    for(let i=0; i<slots.length-1; i++) {
      if (slots[i].endMinutes === slots[i+1].startMinutes) continuousPenalty += 2;
    }
  }

  // 3) 연강 감점
  score -= continuousPenalty;

  // 4) 시작 시간 늦으면 가산점
  score += Math.floor((earliestStart - 8*60)/30);

  // 5) 종료 시간 빨리 끝나면 가산점
  score += Math.floor((18*60 - latestEnd)/30);

  return score;
}
