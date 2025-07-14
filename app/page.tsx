'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Timetable from "@/components/TimeTable";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-start px-4 pt-20 space-y-12">
      <div className="max-w-2xl text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          시간표 마법사
          <span className="bg-orange-500 rounded-xl px-2 py-1 text-white text-lg ml-2">beta</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          시간표 마법사는 간단하게 시간표를 만들어주는 웹 서비스입니다.  
          원하는 과목을 선택하고 자동으로 충돌 없는 조합을 추천받아보세요.
        </p>
        <Link href="/wizard">
          <Button size="lg" className="mt-4 bg-orange-500 font-bold hover:bg-orange-400">마법사 사용하기</Button>
        </Link>
      </div>

      <Card className="w-full max-w-4xl shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">미리보기</h2>
          <Timetable courses={[]} />
        </CardContent>
      </Card>
    </div>
  );
}
