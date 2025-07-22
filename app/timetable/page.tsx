'use client';

import { useEffect, useState } from "react";
import { getAllTimetables, updateTimetable, deleteTimetable } from "@/lib/indexed-db-model";
import TimeTable from "@/components/TimeTable";
import CourseSearchModal from '@/components/Wizard/CourseSearchModal';
import { TimetableData } from "@/types/model";
import CourseTable from "@/components/Wizard/CourseTable";
import { useCourses } from '@/hooks/useCourses';
import { Course } from "@/types/data";
import { hasAnyConflict } from "@/lib/has-conflict";
import { Trash2Icon } from "lucide-react";

export default function TimetablePage() {
  const [timetables, setTimetables] = useState<TimetableData[]>([]);
  const [selected, setSelected] = useState<TimetableData | null>(null);
  const [loading, setLoading] = useState(true);

  const { allCourses, isLoading, error } = useCourses();

  useEffect(() => {
    (async () => {
      const all = await getAllTimetables();
      setTimetables(all);
      setLoading(false);
    })();
  }, []);

  // 시간표 삭제
  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await deleteTimetable(id);
    setTimetables((prev) => prev.filter((t) => t.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const handleAddCourse = async (course: Course) => {
    if (!selected) return;

    if (hasAnyConflict([...selected.data.map(t => t.timeSlots), course.timeSlots])) {
      alert("이미 시간표에 있는 수업과 시간이 겹칩니다.");
      return;
    }

    // 2. 추가 및 저장
    const updatedData = [...selected.data, course];
    const updated = { ...selected, data: updatedData };
    await updateTimetable(updated);

    // 3. 상태 반영
    setSelected(updated);
    setTimetables((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };


  if (loading) return <div>불러오는 중...</div>;

  return (
    <div className="max-w-4xl mx-auto p-2 md:p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">내 시간표 목록</h1>

      {!selected ? (
        <div>
          {timetables.length === 0 && <p>저장된 시간표가 없습니다.</p>}
          <ul>
            {timetables.map((tt) => (
              <li key={tt.id} className="flex justify-between items-center py-2 border-b">
                <button
                  className="text-blue-600 underline text-xl"
                  onClick={() => setSelected(tt)}
                >
                  {tt.id}
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(tt.id)}
                >
                  <Trash2Icon />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <button
            className="mb-4 btn btn-secondary"
            onClick={() => setSelected(null)}
          >
            ← 뒤로가기
          </button>

          <TimeTable courses={selected.data} />
          <h2 className="text-xl font-semibold mt-4">과목 목록</h2>
          <CourseTable
            courses={selected.data}
            buttonType="remove"
            removeCourse={(courseId) => {
              const updated = selected.data.filter((c) => c.id !== courseId);
              const updatedTimetable = { ...selected, data: updated };
              updateTimetable(updatedTimetable);
              setSelected(updatedTimetable);
              setTimetables((prev) =>
                prev.map((t) => (t.id === updatedTimetable.id ? updatedTimetable : t))
              );
            }}
          />

          <div className="flex justify-center mt-4">
            {isLoading && <p>과목 목록을 불러오는 중...</p>}
            {error && <p className="text-red-500">과목 목록 불러오기 실패: {error}</p>}

            {!isLoading && !error && allCourses && (
              <CourseSearchModal
                allCourses={allCourses}
                onSelect={handleAddCourse}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
