import { GroupData } from "@/types/group";
import { Course } from "@/types/data";
import { hasAnyConflict } from "@/lib/has-conflict";
import { scoreTimetable } from "@/lib/score-timetable";

export function generateCombinations<T>(groups: T[][]): T[][] {
  if (groups.length === 0) return [];

  return groups.reduce<T[][]>(
    (acc, group) => {
      const newCombos: T[][] = [];
      for (const combo of acc) {
        for (const item of group) {
          newCombos.push([...combo, item]);
        }
      }
      return newCombos;
    },
    [[]] // 초기값: 빈 조합 하나
  );
}

export function generateTimetables(groups: GroupData[]) {
  const groupCourses = groups.map(group => group.data);
  const combinations = generateCombinations<Course>(groupCourses);

  const valid = combinations.filter(combo => !hasAnyConflict(combo.map(c => c.timeSlots)));
  const scored = valid.map(combo => ({
    timetable: combo,
    score: scoreTimetable(combo.map(course => course.timeSlots)),
  }));

  return scored.sort((a, b) => b.score - a.score);
}
