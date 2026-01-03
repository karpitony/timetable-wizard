import { useEffect, useState } from 'react';
import { Course } from '@/types/data';

const LOCAL_STORAGE_KEY = 'cachedCourses';
const CACHE_TTL = 1000 * 60 * 60; // 1시간

type CachedCourses = {
  timestamp: number;
  data: Course[];
};

export function useCourses() {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (cached) {
      try {
        const parsed: CachedCourses = JSON.parse(cached);
        const isExpired = Date.now() - parsed.timestamp > CACHE_TTL;

        if (!isExpired) {
          setCourses(parsed.data);
          return; // 캐시 유효하면 fetch 생략
        }
      } catch (err) {
        console.warn('Failed to parse cached courses', err);
      }
    }

    // fetch 진행
    fetch('/parsedData.json')
      .then(res => {
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        return res.json();
      })
      .then((data: Course[]) => {
        setCourses(data);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
      })
      .catch(err => {
        console.error(err);
        setError('강의 데이터를 불러오는 중 오류가 발생했습니다.');
      });
  }, []);

  return {
    allCourses: courses,
    isLoading: courses === null,
    error,
  };
}
