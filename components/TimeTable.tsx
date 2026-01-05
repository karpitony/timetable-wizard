'use client';

import { useMemo, useState } from 'react';
import { Course } from '@/types/data';
import { Switch } from '@/components/ui/switch';
import TimetableWithSave from './Wizard/TimetableWithSave';

interface TimetableProps {
  courses: Course[];
  timetableName: string;
}

export default function Timetable({ courses, timetableName }: TimetableProps) {
  const [colorMap, setColorMap] = useState<Map<string, string>>(new Map());
  const [infoHidden, setInfoHidden] = useState(false);

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

  /** 시간 범위 계산 */
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
    const startHour = Math.floor(min / 60);
    const endHour = Math.ceil(max / 60);

    return { startHour, endHour };
  }, [courses]);

  /** 요일 */
  const baseDays = ['월', '화', '수', '목', '금'];
  const includeSaturday = useMemo(() => {
    return courses.some(course => course.timeSlots.some(slot => slot.day === '토'));
  }, [courses]);
  const days = includeSaturday ? [...baseDays, '토'] : baseDays;

  /** 10분 단위 intervals */
  const intervals = Array.from(
    { length: (endHour - startHour) * 6 },
    (_, i) => startHour * 60 + i * 10,
  );

  /** 시작 시점 강의 맵 */
  const courseStartsAt = new Map<string, Course & { slot: Course['timeSlots'][0] }>();
  courses.forEach(course => {
    course.timeSlots.forEach(slot => {
      courseStartsAt.set(`${slot.day}-${slot.startMinutes}`, { ...course, slot });
    });
  });

  /** rowspan 처리용 */
  const skipCells = new Set<string>();

  return (
    <>
      <div className="flex items-center gap-2 mb-4 justify-end">
        <label className="select-none">정보 가리기</label>
        <Switch checked={infoHidden} onCheckedChange={setInfoHidden} />
      </div>

      <div className="w-full max-w-4xl mx-auto border border-gray-300 rounded-md overflow-auto shadow-md">
        <table className="w-full border-collapse table-fixed text-sm">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="w-6 md:w-12 border-2 border-gray-300 px-2 py-2"></th>
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
              const isHourTop = minute === 0;
              const isHalfHour = intervalMinutes % 30 === 0;

              return (
                <tr
                  key={rowIdx}
                  className={`${isHalfHour ? 'border-t border-gray-300' : ''} h-2 md:h-3.5`}
                >
                  {/* 시간 컬럼 */}
                  {isHourTop && (
                    <td
                      rowSpan={6}
                      className="border border-gray-300 bg-gray-50 text-end pr-1 font-mono text-gray-600 select-none align-top"
                    >
                      {hour}
                    </td>
                  )}

                  {days.map(day => {
                    const key = `${day}-${intervalMinutes}`;
                    if (skipCells.has(key)) return null;

                    const courseData = courseStartsAt.get(key);
                    if (courseData) {
                      const { slot } = courseData;
                      const duration = slot.endMinutes - slot.startMinutes;
                      const rowspan = Math.ceil(duration / 10);

                      for (let i = 1; i < rowspan; i++) {
                        skipCells.add(`${day}-${intervalMinutes + i * 10}`);
                      }

                      return (
                        <td
                          key={day}
                          rowSpan={rowspan}
                          className={`border border-gray-300 p-1 text-[10px] md:text-xs align-top ${assignColor(
                            courseData.id,
                          )}`}
                        >
                          <div className="h-full overflow-hidden flex flex-col">
                            <h3 className="font-bold text-xs md:text-sm leading-tight shrink-0">
                              {infoHidden ? '' : courseData.sbjName}
                            </h3>

                            <p
                              className="flex-1 whitespace-pre-wrap wrap-break-word overflow-hidden text-ellipsis leading-tight"
                              title={courseData.location}
                            >
                              {infoHidden ? '' : courseData.location}
                            </p>
                          </div>
                        </td>
                      );
                    }

                    return (
                      <td key={day} className="border-l border-r border-gray-300 h-2 md:h-3.5" />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <TimetableWithSave courses={courses} timetableName={timetableName} />
      </div>
    </>
  );
}

const COLORS = [
  'bg-orange-100 border-orange-300',
  'bg-blue-100 border-blue-300',
  'bg-green-100 border-green-300',
  'bg-purple-100 border-purple-300',
  'bg-pink-100 border-pink-300',
  'bg-yellow-100 border-yellow-300',
  'bg-red-100 border-red-300',
  'bg-teal-100 border-teal-300',
  'bg-gray-100 border-gray-300',
  'bg-indigo-100 border-indigo-300',
  'bg-lime-100 border-lime-300',
  'bg-cyan-100 border-cyan-300',
  'bg-amber-100 border-amber-300',
];
