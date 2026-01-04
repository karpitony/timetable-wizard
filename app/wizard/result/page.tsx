'use client';

import { useEffect, useState, useMemo } from 'react';
import { Course } from '@/types/data';
import { GroupData } from '@/types/model';
import { useCourses } from '@/hooks/useCourses';
import { useTimetables } from '@/hooks/useTimetables';
import { getAllGroups } from '@/lib/indexed-db-model';
import Timetable from '@/components/TimeTable';

const PAGE_SIZE = 10;

function hydrateGroups(groups: GroupData[], courseMap: Map<string, Course>) {
  return groups.map(group => ({
    ...group,
    data: (group.data ?? []).map(key => courseMap.get(key)).filter(Boolean), // 폐강 과목 자동 제거
  }));
}

export default function ResultPage() {
  const { allCourses, isLoading: coursesLoading, error: coursesError } = useCourses();
  const {
    generate,
    timetables,
    isLoading: timetablesLoading,
    error: timetablesError,
  } = useTimetables();

  const [loadingMessage, setLoadingMessage] = useState('');
  const [page, setPage] = useState(0);

  const courseMap = useMemo(() => {
    if (!allCourses) return new Map<string, Course>();
    return new Map(allCourses.map(c => [c.id, c]));
  }, [allCourses]);

  useEffect(() => {
    if (!allCourses) return;
    (async () => {
      const rawGroups = await getAllGroups();
      setLoadingMessage('시간표를 생성 중입니다...');
      const hydratedGroups = hydrateGroups(rawGroups, courseMap);
      await generate(hydratedGroups);
      setLoadingMessage('');
    })();
  }, [allCourses, generate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const pageCount = Math.ceil(timetables.length / PAGE_SIZE);
  const currentPageItems = timetables.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="p-2 md:p-4 min-h-screen max-w-3xl mx-auto">
      <h2 className="font-bold text-3xl mb-4">결과 페이지</h2>

      {coursesLoading && <p className="text-blue-500">{loadingMessage}</p>}
      {coursesError && <p className="text-red-500">오류: {coursesError}</p>}

      {!coursesLoading && !coursesError && !timetablesLoading && !timetablesError && (
        <>
          <p className="mb-2">{timetables.length}개의 시간표가 만들어졌습니다.</p>
          <p className="text-sm text-gray-600 mb-6">
            공강, 늦게 시작, 일찍 끝나는 경우 가산점이 부과되어 앞에 표시됩니다.
          </p>

          {currentPageItems.map((result, idx) => (
            <div key={idx} className="mb-10">
              <h3 className="text-xl font-semibold mb-2">
                시간표 {page * PAGE_SIZE + idx + 1} (점수: {result.score})
              </h3>
              <Timetable courses={result.timetable} />
            </div>
          ))}

          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setPage(p => Math.max(p - 1, 0))}
              disabled={page === 0}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              이전
            </button>
            <span className="px-3 py-1">
              {page + 1} / {pageCount}
            </span>
            <button
              onClick={() => setPage(p => Math.min(p + 1, pageCount - 1))}
              disabled={page === pageCount - 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              다음
            </button>
          </div>
        </>
      )}
    </div>
  );
}
