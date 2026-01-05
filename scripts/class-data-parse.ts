// 강의실별 시간표 조회 데이터로 2026-1학기 전체 강의 데이터 구축 스크립트

import fs from 'fs';
import path from 'path';
import { Course } from '../types/data';
import { mapToCourse } from '@/lib/Parser';
import { RawClassTimetable } from '@/types/raw-data';

const RAW_DIR = path.resolve(process.cwd(), 'public/2026-1');
const OUTPUT_DIR = path.resolve(process.cwd(), 'public');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'parsedData.json');

type JsonFileType = { dsMain: RawClassTimetable[] };

function readJsonFile<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

function getRawJsonFiles(dir: string): string[] {
  return fs
    .readdirSync(dir)
    .filter(file => file.endsWith('.json'))
    .map(file => path.join(dir, file));
}

const dayOrder: Record<string, number> = {
  월: 0,
  화: 1,
  수: 2,
  목: 3,
  금: 4,
  토: 5,
};

function sortTimeSlots(slots: Course['timeSlots']) {
  return [...slots].sort((a, b) => {
    // 1. 요일 순
    const dayDiff = dayOrder[a.day] - dayOrder[b.day];
    if (dayDiff !== 0) return dayDiff;

    // 2. 시작 시간 순
    return a.startMinutes - b.startMinutes;
  });
}

function mergeCourse(existing: Course, incoming: Course): Course {
  const merged = [...existing.timeSlots, ...incoming.timeSlots];

  const unique = merged.filter(
    (slot, index, self) =>
      index ===
      self.findIndex(
        s =>
          s.day === slot.day &&
          s.startMinutes === slot.startMinutes &&
          s.endMinutes === slot.endMinutes,
      ),
  );

  return {
    ...existing,
    timeSlots: sortTimeSlots(unique),
  };
}

function buildCourses() {
  if (!fs.existsSync(RAW_DIR)) {
    throw new Error(`RAW_DIR not found: ${RAW_DIR}`);
  }

  const files = getRawJsonFiles(RAW_DIR);
  const courseMap = new Map<string, Course>();

  for (const file of files) {
    console.log(`📦 processing: ${path.basename(file)}`);
    const rawItems = readJsonFile<JsonFileType>(file).dsMain;

    for (const raw of rawItems) {
      try {
        const course = mapToCourse(raw);
        const prev = courseMap.get(course.id);
        if (prev) {
          courseMap.set(course.id, mergeCourse(prev, course));
        } else {
          courseMap.set(course.id, course);
        }
      } catch (err) {
        console.warn(`⚠️  failed to parse course: ${raw.SBJ_NO}-${raw.DVCLS}`, err);
      }
    }
  }

  const courses: Course[] = Array.from(courseMap.values());
  const sortedCourses = courses.sort((a, b) => a.id.localeCompare(b.id));
  // 출력 디렉터리 보장
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sortedCourses, null, 2), 'utf-8');

  console.log(`✅ build complete: ${courses.length} courses`);
  console.log(`➡️  output: ${OUTPUT_FILE}`);
}

buildCourses();
