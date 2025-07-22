'use client';
import { useState } from 'react';
import CourseTable from "@/components/Wizard/CourseTable";
import { useCourses } from '@/hooks/useCourses';
import { Course } from '@/types/data';

const IS_COMPETITION_ENABLED = true;

export default function CourseCompetitionPage() {
  const { allCourses, isLoading, error } = useCourses();
  const [myCourses, setMyCourses] = useState<Course[]>([]);

  if (!IS_COMPETITION_ENABLED) return (
    <div className="max-w-4xl mx-auto p-4 min-h-[80vh]">
      <h1 className="text-2xl font-bold mb-4">강의 경쟁률</h1>
      <p>현재 강의 경쟁률 정보는 제공되지 않습니다. 곧 업데이트될 예정입니다.</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-[80vh]">
      <h1 className="text-2xl font-bold mb-4">강의 경쟁률</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">내 강의 목록</h2>
        <CourseTable
          courses={myCourses}
          removeCourse={(id) => {
            setMyCourses(prev => prev.filter(c => c.id !== id));
            // TODO: IndexedDB에서도 삭제 로직 추가 필요
          }}
          isCompetitionEnabled={IS_COMPETITION_ENABLED}
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">전체 강의 데이터</h2>

        {isLoading && <p>강의 데이터를 불러오는 중...</p>}
        {error && <p className="text-red-600">오류 발생: {error}</p>}

        {!isLoading && !error && (
          <CourseTable
            courses={allCourses || []}
            removeCourse={() => {}}
            isCompetitionEnabled={IS_COMPETITION_ENABLED}
          />
        )}
      </section>
    </div>
  );
}
