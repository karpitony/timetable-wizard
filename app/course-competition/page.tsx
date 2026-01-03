'use client';
import { useState, useEffect, useMemo } from 'react';
import CourseTable from '@/components/Wizard/CourseTable';
import { useCourses } from '@/hooks/useCourses';
import { Course } from '@/types/data';
import { getAllMyCourses, saveMyCourse, deleteMyCourse } from '@/lib/indexed-db-model';

const PAGE_INCREMENT = 30;
const IS_COMPETITION_ENABLED = false; // 강의 경쟁률 기능 활성화 여부

export default function CourseCompetitionPage() {
  if (!IS_COMPETITION_ENABLED)
    return (
      <div className="max-w-4xl mx-auto p-4 min-h-[80vh]">
        <h1 className="text-2xl font-bold mb-4">강의 경쟁률</h1>
        <p>현재 강의 경쟁률 정보는 제공되지 않습니다. 곧 업데이트될 예정입니다.</p>
      </div>
    );

  const { allCourses, isLoading, error } = useCourses();
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_INCREMENT);

  const filteredCourses = useMemo(() => {
    if (!allCourses) return [];
    if (!searchQuery.trim()) return allCourses;
    return allCourses.filter(
      c =>
        c.sbjName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [allCourses, searchQuery]);

  const visibleCourses = filteredCourses ? filteredCourses.slice(0, visibleCount) : [];

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + PAGE_INCREMENT, allCourses?.length ?? prev));
  };

  useEffect(() => {
    const loadMyCourses = async () => {
      const stored = await getAllMyCourses();
      setMyCourses(stored);
    };
    loadMyCourses();
  }, []);

  // 즐겨찾기 추가 (중복 방지)
  const addToFavorites = async (course: Course) => {
    if (myCourses.find(c => c.id === course.id)) return;
    setMyCourses(prev => [...prev, course]);
    await saveMyCourse(course);
  };

  // 즐겨찾기에서 제거
  const removeFromFavorites = async (courseId: string) => {
    setMyCourses(prev => prev.filter(c => c.id !== courseId));
    await deleteMyCourse(courseId);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-[80vh]">
      <h1 className="text-2xl font-bold mb-4">강의 경쟁률</h1>

      {/* 즐겨찾기 */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-2">내 즐겨찾기 강의 목록</h2>
        <CourseTable
          courses={myCourses}
          buttonType="remove"
          removeCourse={removeFromFavorites}
          isCompetitionEnabled={IS_COMPETITION_ENABLED}
        />
      </section>

      {/* 검색창 */}
      <section className="mb-4 flex w-full gap-4 items-center">
        <input
          type="text"
          className="w-120 border border-gray-300 rounded px-4 py-2"
          placeholder="강의명, 교수명, 과목번호로 검색"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              setSearchQuery(inputValue.trim());
              setVisibleCount(PAGE_INCREMENT);
            }
          }}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition-colors"
          onClick={() => {
            setSearchQuery(inputValue.trim());
            setVisibleCount(PAGE_INCREMENT);
          }}
        >
          검색
        </button>
      </section>

      {/* 전체 강의 + 검색 결과 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">전체 강의 데이터</h2>

        {isLoading && <p>강의 데이터를 불러오는 중...</p>}
        {error && <p className="text-red-600">오류 발생: {error}</p>}

        {!isLoading && !error && (
          <>
            <CourseTable
              courses={visibleCourses}
              buttonType="add"
              addCourse={addToFavorites}
              isCompetitionEnabled={IS_COMPETITION_ENABLED}
            />
            {visibleCount < (filteredCourses?.length ?? 0) && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={loadMore}
                  className="px-12 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition font-semibold"
                >
                  더 보기
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
