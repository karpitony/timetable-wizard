'use client';

import Link from 'next/link';
import { Course } from '@/types/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Timetable from '@/components/TimeTable';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-start px-1 md:px-4 pt-20 space-y-12">
      <div className="max-w-2xl text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          시간표 마법사
          <span className="bg-orange-500 rounded-xl px-2 py-1 text-white text-lg ml-2">beta</span>
        </h1>
        <p className="text-muted-foreground text-lg whitespace-pre-line">
          {
            '간단하게 시간표를 만들어주는 웹 서비스입니다.\n 원하는 과목을 선택하고 충돌 없는 조합을 추천받아보세요.'
          }
        </p>
        <Link href="/wizard">
          <Button size="lg" className="mt-4 bg-orange-500 font-bold hover:bg-orange-400">
            마법사 사용하기
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-4xl shadow-xl">
        <CardContent className="p-1 md:p-6">
          <h2 className="text-xl font-semibold mb-4 pl-4 md:pl-0">미리보기</h2>
          <Timetable courses={dummyCourses} timetableName="미리보기" />
        </CardContent>
      </Card>
    </div>
  );
}

const dummyCourses: Course[] = [
  {
    id: 'BIS2001-01',
    sbjNo: 'BIS2001',
    sbjName: '불교와인간',
    instructor: '김불심',
    location: '만해관 301호',
    timeSlots: [
      { day: '월', startMinutes: 540, endMinutes: 630, periodStart: '2', periodEnd: '3' }, // 09:00 ~ 10:30
      { day: '수', startMinutes: 540, endMinutes: 630, periodStart: '2', periodEnd: '3' }, // 09:00 ~ 10:30
    ],
    memo: null,
  },
  {
    id: 'CSE1010-02',
    sbjNo: 'CSE1010',
    sbjName: '기초프로그래밍',
    instructor: '이개발',
    location: '혜화관 201호',
    timeSlots: [
      { day: '화', startMinutes: 600, endMinutes: 690, periodStart: '3', periodEnd: '4' }, // 10:00 ~ 11:30
      { day: '목', startMinutes: 600, endMinutes: 690, periodStart: '3', periodEnd: '4' }, // 10:00 ~ 11:30
    ],
    memo: null,
  },
  {
    id: 'ENG1234-01',
    sbjNo: 'ENG1234',
    sbjName: 'Business English1',
    instructor: 'John Smith',
    location: '학림관 101호',
    timeSlots: [
      { day: '금', startMinutes: 780, endMinutes: 870, periodStart: '6', periodEnd: '7' }, // 13:00 ~ 14:30
    ],
    memo: null,
  },
  {
    id: 'MTH1101-01',
    sbjNo: 'MTH1101',
    sbjName: '미적분학및연습1',
    instructor: '정수학',
    location: '혜화관 302호',
    timeSlots: [
      { day: '월', startMinutes: 690, endMinutes: 780, periodStart: '4', periodEnd: '5' }, // 11:30 ~ 13:00
      { day: '수', startMinutes: 690, endMinutes: 780, periodStart: '4', periodEnd: '5' }, // 11:30 ~ 13:00
    ],
    memo: null,
  },
  {
    id: 'PHY1001-01',
    sbjNo: 'PHY1001',
    sbjName: '일반물리학및실험1',
    instructor: '박실험',
    location: '과학관 B2실험실',
    timeSlots: [
      { day: '목', startMinutes: 810, endMinutes: 960, periodStart: '7', periodEnd: '9' }, // 13:30 ~ 16:00
    ],
    memo: null,
  },
];
