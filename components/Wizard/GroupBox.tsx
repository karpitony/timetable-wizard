'use client';
import { useState } from "react";

interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  time: string;
  location: string;
}

interface GroupBoxProps {
  groupId: string;
  groupIndex: number;
  removeGroup: (groupId: string) => void;
}

const GroupBox = ({ groupId, groupIndex, removeGroup }: GroupBoxProps) => {
  const [courses, setCourses] = useState<Course[]>([]);

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        // 임시 데이터
        id: Date.now().toString(),
        code: "CS101", 
        name: "새 과목",
        instructor: "교수님",
        time: "시간",
        location: "장소",
      },
    ]);
  };

  const removeCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  return (
    <div className="border rounded p-4 mb-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-orange-500">그룹 {groupIndex + 1}</h2>
        <button
          className="text-orange-500"
          onClick={() => removeGroup(groupId)}
        >
          삭제
        </button>
      </div>

      <table className="w-full border-collapse text-sm mb-2 text-left">
        <thead>
          <tr>
            <th className="border px-2 py-1">학수번호</th>
            <th className="border px-2 py-1">과목명</th>
            <th className="border px-1 py-1 w-24">교수명</th>
            <th className="border px-2 py-1">시간</th>
            <th className="border px-2 py-1 hidden md:block">장소</th>
            <th className="border px-1 py-1 w-10">삭제</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td className="border px-2 py-1">{course.code}</td>
              <td className="border px-2 py-1">{course.name}</td>
              <td className="border px-1 py-1 w-24">{course.instructor}</td>
              <td className="border px-2 py-1">{course.time}</td>
              <td className="border px-2 py-1 hidden md:block">{course.location}</td>
              <td className="border px-1 py-1 w-10 text-center">
                <button
                  className="text-orange-500"
                  onClick={() => removeCourse(course.id)}
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center">
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded w-1/2 font-bold"
          onClick={addCourse}
        >
          과목 추가
        </button>
      </div>
    </div>
  );
};

export default GroupBox;
