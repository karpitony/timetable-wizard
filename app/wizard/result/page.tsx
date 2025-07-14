'use client';

import { useEffect, useState } from "react";
import { useTimetables } from "@/hooks/useTimetables";
import { getAllGroups } from "@/lib/indexed-db-model";
import Timetable from "@/components/TimeTable";

export default function ResultPage() {
  const { generate, timetables, isLoading, error } = useTimetables();
  const [loadingMessage, setLoadingMessage] = useState("");

  useEffect(() => {
    (async () => {
      const groups = await getAllGroups();
      setLoadingMessage("시간표를 생성 중입니다...");
      await generate(groups);
      setLoadingMessage("");
    })();
  }, []);

  return (
    <div className="p-4 bg-gray-50 min-h-screen max-w-3xl mx-auto">
      <h2 className="font-bold text-3xl mb-4">결과 페이지</h2>

      {isLoading && <p className="text-blue-500">{loadingMessage}</p>}
      {error && <p className="text-red-500">오류: {error}</p>}

      {!isLoading && !error && (
        <>
          <p className="mb-2">{timetables.length}개의 시간표가 만들어졌습니다.</p>
          <p className="text-sm text-gray-600 mb-6">
            공강, 늦게 시작, 일찍 끝나는 경우 가산점이 부과되어 앞에 표시됩니다.
          </p>

          {timetables.slice(0, 5).map((result, idx) => (
            <div key={idx} className="mb-10">
              <h3 className="text-xl font-semibold mb-2">시간표 {idx + 1} (점수: {result.score})</h3>
              <Timetable courses={result.timetable} />
              {/* 혹은 과목 목록 테이블도 함께 보여줄 수 있음 */}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
