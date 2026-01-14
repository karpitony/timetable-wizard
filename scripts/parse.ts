import fs from 'fs';
import path from 'path';
import { Course } from '../types/data';
import { mapToCourse } from '@/lib/Parser';
import { RawCourseItem } from '@/types/raw-data';

const RAW_PATH = path.resolve(process.cwd(), 'public/rawData_2026_1.json');
const OUTPUT_DIR = path.resolve(process.cwd(), 'public');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'parsedData.json');

// ✅ raw JSON 로드
const rawJson = JSON.parse(fs.readFileSync(RAW_PATH, 'utf-8'));

if (!rawJson || !Array.isArray(rawJson.dsMain)) {
  throw new Error('❌ rawData.json의 dsMain 필드가 배열이 아닙니다.');
}

const dsMain: RawCourseItem[] = rawJson.dsMain;

// ✅ 단일 → map
const parsed: Course[] = dsMain.map(mapToCourse);

// ✅ 이미 만든 OUTPUT_FILE 사용
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(parsed, null, 2), 'utf-8');

console.log(`✅ ${parsed.length}개의 강의 데이터를 parsedData.json으로 저장했습니다.`);
