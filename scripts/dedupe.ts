/**
 * 시간표 중복 제거
 * 필요할때만 주석 풀고 실행하기
 * 주 용도는 최종 경쟁률을 위해 두 개의 rawData를 합치는 것
 */

// import fs from "fs";
// import path from "path";
// import rawJson1 from "../public/rawData_2025_2_y.json" assert { type: "json" };
// import rawJson2 from "../public/rawData_2025_2_m.json" assert { type: "json" };

// const OUTPUT_FILENAME = "rawData_2025_2.json";

// const dsMain1 = rawJson1.dsMain;
// const dsMain2 = rawJson2.dsMain;

// const combined = [...dsMain1, ...dsMain2];
// const uniqueCourses = new Map<string, typeof dsMain1[0]>();
// combined.forEach((course) => {
//   const key = `${course.SBJ_NO}-${course.DVCLS}`;
//   if (!uniqueCourses.has(key)) {
//     uniqueCourses.set(key, course);
//   }
// });

// const dedupedCourses = Array.from(uniqueCourses.values());
// const wrappedData = { dsMain: dedupedCourses };
// const outputPath = path.resolve(__dirname, `../public/${OUTPUT_FILENAME}`);
// fs.writeFileSync(outputPath, JSON.stringify(wrappedData, null, 2), "utf-8");
