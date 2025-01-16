import Link from "next/link";
import Timetable from "@/components/TimeTable";

export default function Home() {
  return (
    <div>
      <h1>시간표 마법사</h1>
      <p>시간표 마법사는 간단하게 시간표를 만들어주는 웹 서비스입니다.</p>
      <Timetable />
      <Link href="/wizard">
        <p>마법사 사용하기</p>
      </Link>
    </div>
  );
}
