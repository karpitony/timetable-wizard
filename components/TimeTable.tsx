'use client';
import { useState } from "react";

const Timetable = () => {
  const [startHour, setStartHour] = useState(9);
  const [endHour, setEndHour] = useState(15);

  const days = ["월", "화", "수", "목", "금", "토"];

  const generateHours = () => {
    const hours = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      hours.push(hour);
    }
    return hours;
  };

  const addHourRange = (newStart, newEnd) => {
    setStartHour(Math.min(startHour, newStart));
    setEndHour(Math.max(endHour, newEnd));
  };

  const hours = generateHours();

  return (
    <div className="w-full max-w-4xl mx-auto border border-gray-300">
      <table className="w-full border-collapse table-auto text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-1 bg-gray-100"></th>
            {days.map((day, idx) => (
              <th key={idx} className="border border-gray-300 px-4 py-2 bg-gray-100">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, rowIdx) => (
            <tr key={rowIdx}>
              <td className="border border-gray-300 px-2 py-1 bg-gray-50 text-center">
                {hour}
              </td>
              {days.map((_, colIdx) => (
                <td
                  key={colIdx}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  {/* 여기에 나중에 수업 데이터를 렌더링 */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
