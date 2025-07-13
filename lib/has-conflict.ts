import { Schedule } from "@/types/data";

export function hasConflict(a: Schedule[], b: Schedule[]): boolean {
  for (const slotA of a) {
    for (const slotB of b) {
      if (slotA.day !== slotB.day) continue;
      if (slotA.endMinutes > slotB.startMinutes && slotB.endMinutes > slotA.startMinutes) {
        return true; // 겹침
      }
    }
  }
  return false;
}


/** 예시 테스트 */
const slotsA: Schedule[] = [
  { day: '월', startMinutes: 720, endMinutes: 810 }, // 12:00 ~ 13:30
];

const slotsB: Schedule[] = [
  { day: '월', startMinutes: 780, endMinutes: 870 }, // 13:00 ~ 14:30 (겹침)
];

const slotsC: Schedule[] = [
  { day: '화', startMinutes: 720, endMinutes: 810 }, // 다른 요일(월 아님)
];

console.log(hasConflict(slotsA, slotsB)); // true
console.log(hasConflict(slotsA, slotsC)); // false
