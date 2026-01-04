'use client';

import { useCourses } from '@/hooks/useCourses';
import { useTimetableIntegrityCheck } from '@/hooks/useTimetableIntegrityCheck';

export default function TimetableIntegrityGate() {
  const { allCourses, isLoading } = useCourses();
  const { status, issues, hasIssue } = useTimetableIntegrityCheck(allCourses);

  if (isLoading || status === 'checking') {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white px-6 py-4 rounded">
          시간표를 최신 데이터 기준으로 점검 중입니다…
        </div>
      </div>
    );
  }

  if (status === 'done' && hasIssue) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-3 rounded">
        일부 시간표에 문제가 발견되었습니다. 확인해 주세요.
        <ul className="mt-2 list-disc list-inside text-sm">
          {issues.map((issue, index) => (
            <li key={index}>{issue.name}</li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}
