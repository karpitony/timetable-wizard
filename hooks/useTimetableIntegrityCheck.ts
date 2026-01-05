import { useEffect, useState } from 'react';
import { getAllTimetables, updateTimetable } from '@/lib/indexed-db-model';
import { hasAnyConflict } from '@/lib/has-conflict';
import { Course } from '@/types/data';
import { CACHE_KEY } from '@/constants/storage';

type Status = 'idle' | 'checking' | 'done';

type TimetableIssue = {
  id: string;
  name: string;
  reasons: ('REMOVED' | 'CONFLICT')[];
};

export function useTimetableIntegrityCheck(allCourses: Course[] | null) {
  const [status, setStatus] = useState<Status>('idle');
  const [issues, setIssues] = useState<TimetableIssue[]>([]);

  useEffect(() => {
    if (!allCourses || allCourses.length === 0) return;

    let cancelled = false;

    async function run() {
      setStatus('checking');

      const timetables = await getAllTimetables();
      if (!allCourses || allCourses.length === 0) return;
      const courseMap = new Map(allCourses.map(c => [c.id, c]));
      const foundIssues: TimetableIssue[] = [];

      for (const tt of timetables) {
        if (tt.updatedAt === CACHE_KEY) continue;

        const courses = tt.data.map(id => courseMap.get(id)).filter(Boolean);

        const reasons: TimetableIssue['reasons'] = [];

        if (courses.length !== tt.data.length) {
          reasons.push('REMOVED');
        }

        const validCourses = courses.filter((c): c is Course => c !== undefined);
        if (hasAnyConflict(validCourses.map(c => c.timeSlots))) {
          reasons.push('CONFLICT');
        }

        const hasIssue = reasons.length > 0;

        if (hasIssue) {
          foundIssues.push({
            id: tt.id,
            name: tt.id,
            reasons,
          });
        }

        await updateTimetable({
          ...tt,
          updatedAt: CACHE_KEY,
          hasIssue,
        });
      }

      if (!cancelled) {
        setIssues(foundIssues);
        setStatus('done');
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [allCourses]);

  return {
    status,
    issues,
    hasIssue: issues.length > 0,
  };
}
