import { useEffect, useState } from 'react';
import { Course } from '@/types/data';

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch('/parsedData.json')
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  return courses;
}