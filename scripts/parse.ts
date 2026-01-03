import fs from 'fs';
import path from 'path';
import rawJson from '../public/rawData_2025_2.json' assert { type: 'json' };
import { Course } from '../types/data';
import { parseRawCourse, RawCourseItem } from '@/lib/Parser';

if (!rawJson || !Array.isArray(rawJson.dsMain)) {
  throw new Error('❌ rawData.json의 dsMain 필드가 배열이 아닙니다.');
}

const dsMain: RawCourseItem[] = rawJson.dsMain;
const parsed: Course[] = dsMain.map(parseRawCourse);

const outputPath = path.resolve(__dirname, '../public/parsedData.json');
fs.writeFileSync(outputPath, JSON.stringify(parsed, null, 2), 'utf-8');

console.log(`✅ ${parsed.length}개의 강의 데이터를 parsedData.json으로 저장했습니다.`);
