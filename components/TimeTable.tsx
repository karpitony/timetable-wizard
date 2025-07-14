'use client';

import { useMemo, useState } from "react";
import { Course } from "@/types/data";
import TimetableWithSave from "./Wizard/TimetableWithSave";

interface TimetableProps {
  courses: Course[];
};

const COLORS = [
  'bg-orange-100 border-orange-300', 'bg-blue-100 border-blue-300',
  'bg-green-100 border-green-300', 'bg-purple-100 border-purple-300',
  'bg-pink-100 border-pink-300', 'bg-yellow-100 border-yellow-300',
  'bg-red-100 border-red-300', 'bg-teal-100 border-teal-300',
  'bg-gray-100 border-gray-300', 'bg-indigo-100 border-indigo-300',
  'bg-lime-100 border-lime-300', 'bg-cyan-100 border-cyan-300',
  'bg-amber-100 border-amber-300',
];

function Timetable({ courses }: TimetableProps) {
  const [colorMap, setColorMap] = useState<Map<string, string>>(new Map());

  const assignColor = (id: string) => {
    if (colorMap.has(id)) return colorMap.get(id)!;
    const usedColors = new Set(colorMap.values());
    const availableColors = COLORS.filter(c => !usedColors.has(c));

    if (availableColors.length === 0) {
      return COLORS[0];
    }

    const color = availableColors[0];
    setColorMap(new Map(colorMap).set(id, color));
    return color;
  };


  const { startHour, endHour } = useMemo(() => {
    if (!courses || courses.length === 0) {
      return { startHour: 9, endHour: 15 }; // 기본값
    }

    let min = Infinity;
    let max = -Infinity;

    for (const course of courses) {
      for (const slot of course.timeSlots) {
        min = Math.min(min, slot.startMinutes);
        max = Math.max(max, slot.endMinutes);
      }
    }

    const startHour = Math.floor(min / 60) - 1;
    const endHour = Math.ceil(max / 60) + 2;

    return { startHour, endHour };
  }, [courses]);

  const baseDays = ["월", "화", "수", "목", "금"];
  const includeSaturday = useMemo(() => {
    return courses.some(course =>
      course.timeSlots.some(slot => slot.day === "토")
    );
  }, [courses]);
  const days = includeSaturday ? [...baseDays, "토"] : baseDays;


  const skipCells = new Set<string>();
  const intervals = Array.from({ length: (endHour - startHour) * 2 }, (_, i) => startHour * 60 + i * 30);

  // 강의가 시작하는 시간을 추적하여, 해당 시간에만 셀을 렌더링하도록 합니다.
  const courseStartsAt = new Map<string, Course>();
  courses?.forEach(course => {
    course.timeSlots.forEach(slot => {
      const key = `${slot.day}-${slot.startMinutes}`;
      courseStartsAt.set(key, course);
    });
  });

  return (
    <>
    <div className="w-full max-w-4xl mx-auto border border-gray-300 rounded-md overflow-auto shadow-md">
      <table className="w-full border-collapse table-fixed text-sm">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th className="w-12 border-2 border-gray-300 px-2 py-2"></th>
            {days.map((day, idx) => (
              <th
                key={idx}
                className="border-2 border-gray-300 px-4 py-2 text-center font-semibold text-gray-700 select-none"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {intervals.map((intervalMinutes, rowIdx) => {
            const hour = Math.floor(intervalMinutes / 60);
            const minute = intervalMinutes % 60;
            const isTopCell = minute === 0;

            return (
              <tr key={rowIdx}>
                {isTopCell && (
                  <td
                    className="border-1 border-gray-300 bg-gray-50 h-10 pt-1 pb-10 pr-1 text-end font-mono text-gray-600 select-none"
                    rowSpan={2}
                  >
                    {hour}
                  </td>
                )}

                {days.map((day, colIdx) => {
                  const key = `${day}-${intervalMinutes}`;

                  // 이미 상위 셀에서 rowspan으로 커버하는 경우 건너뛰기
                  if (skipCells.has(key)) {
                    return null; // 셀을 그리지 않음
                  }

                  const course = courseStartsAt.get(key);

                  if (course) {
                    const timeSlot = course.timeSlots.find(
                      (slot) => slot.day === day && slot.startMinutes === intervalMinutes
                    );

                    if (!timeSlot) return <td key={colIdx} className="border-1 border-gray-300 p-2 h-10 "></td>;

                    const durationMinutes = timeSlot.endMinutes - timeSlot.startMinutes;
                    const rowspanValue = durationMinutes / 30;

                    // 아래 행에서 스킵할 셀들 등록
                    for (let i = 1; i < rowspanValue; i++) {
                      const skipKey = `${day}-${intervalMinutes + i * 30}`;
                      skipCells.add(skipKey);
                    }

                    return (
                      <td
                        key={colIdx}
                        className={`h-10 border-1 border-gray-300 p-2 relative text-xs align-top ${assignColor(course.id)}`}
                        rowSpan={rowspanValue}
                      >
                        <div className="font-semibold">{course.sbjNo}</div>
                        <div>{course.sbjName}</div>
                        <div>{course.instructor}</div>
                      </td>
                    );
                  }

                  // 빈 셀 렌더링
                  return (
                    <td
                      key={colIdx}
                      className="border-1 border-gray-300 p-2 h-10"
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <div className="mt-4">
      <TimetableWithSave courses={courses} />
    </div>
    </>
  );
};

export default Timetable;