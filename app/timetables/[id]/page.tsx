'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getTimetable, updateTimetable } from '@/lib/indexed-db-model';
import { useCourses } from '@/hooks/useCourses';
import TimeTable from '@/components/TimeTable';
import CourseTable from '@/components/Wizard/CourseTable';
import CourseSearchModal from '@/components/Wizard/CourseSearchModal';
import { hasAnyConflict } from '@/lib/has-conflict';
import { Course } from '@/types/data';
import { TimetableData } from '@/types/model';

export default function TimetableDetailPage() {
  const { id } = useParams<{ id: string }>();
  const decodedId = decodeURIComponent(id);
  const router = useRouter();

  const [timetable, setTimetable] = useState<TimetableData | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const { allCourses, isLoading, error } = useCourses();

  useEffect(() => {
    (async () => {
      const tt = await getTimetable(decodedId);
      setTimetable(tt);
      setLoading(false);
    })();
  }, [decodedId, router]);

  const courseMap = useMemo(() => {
    if (!allCourses) return new Map<string, Course>();
    return new Map(allCourses.map(c => [c.id, c]));
  }, [allCourses]);

  const courses = useMemo(() => {
    if (!timetable) return [];
    return timetable.data.map(id => courseMap.get(id)).filter(Boolean) as Course[];
  }, [timetable, courseMap]);

  const handleAddCourse = async (course: Course) => {
    if (!timetable) return;

    if (hasAnyConflict([...courses.map(c => c.timeSlots), course.timeSlots])) {
      alert('이미 시간표에 있는 수업과 시간이 겹칩니다.');
      return;
    }

    const updated = {
      ...timetable,
      data: [...timetable.data, course.id],
    };

    await updateTimetable(updated);
    setTimetable(updated);
  };

  if (loading)
    return (
      <div className="max-w-4xl mx-auto p-4 min-h-[80vh]">
        <p>불러오는 중...</p>
      </div>
    );

  if (!timetable)
    return (
      <div className="max-w-4xl mx-auto p-4 min-h-[80vh]">
        <p className="text-red-500 text-xl">{decodedId} 이름의 시간표를 찾을 수 없습니다.</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-[80vh]">
      <button className="mb-4 text-blue-600 underline" onClick={() => router.push('/timetables')}>
        ← 목록으로
      </button>

      <TimeTable courses={courses} timetableName={timetable?.id ?? ''} />

      <h2 className="text-xl font-semibold mt-4">과목 목록</h2>
      <CourseTable
        courses={courses}
        buttonType="remove"
        removeCourse={courseId => {
          if (!timetable) return;
          const updated = {
            ...timetable,
            data: timetable.data.filter(id => id !== courseId),
          };
          updateTimetable(updated);
          setTimetable(updated);
        }}
      />

      <div className="flex justify-center mt-4">
        {isLoading && <p>과목 목록을 불러오는 중...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && !error && allCourses && (
          <CourseSearchModal allCourses={allCourses} onSelect={handleAddCourse} />
        )}
      </div>
    </div>
  );
}
