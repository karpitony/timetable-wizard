import { useEffect, useState } from 'react';
import { Course } from '@/types/data';

const CACHE_VERSION = 2;
const CACHE_KEY = `courses@2026-1@v${CACHE_VERSION}`;
const CACHE_TTL = 1000 * 60 * 60; // 1시간

type CachedCourses = {
  version: number;
  timestamp: number;
  data: Course[];
};

function loadCache(): CachedCourses | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveCache(data: Course[]) {
  const payload: CachedCourses = {
    version: CACHE_VERSION,
    timestamp: Date.now(),
    data,
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = loadCache();

    if (cached) {
      setCourses(cached.data);
    }

    const isExpired = !cached || Date.now() - cached.timestamp > CACHE_TTL;

    if (!isExpired) return;

    // 백그라운드 갱신
    fetch('/parsedData.json')
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: Course[]) => {
        setCourses(data);
        saveCache(data);
      })
      .catch(() => {
        if (!cached) {
          setError('강의 데이터를 불러오는 중 오류가 발생했습니다.');
        }
      });
  }, []);

  return {
    allCourses: courses,
    isLoading: courses === null,
    error,
  };
}
