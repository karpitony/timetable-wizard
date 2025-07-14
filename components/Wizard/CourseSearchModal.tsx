// components/CourseSearchModal.tsx
'use client';
import { Course } from '@/types/data';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { formatTime } from '@/lib/format-time';
import { 
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
 } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Props {
  allCourses: Course[];
  onSelect: (course: Course) => void;
}

export default function CourseSearchModal({ allCourses, onSelect }: Props) {
  const [query, setQuery] = useState('');

  const filtered = allCourses.filter((c) =>
    c.sbjName.includes(query) || c.instructor.includes(query) || c.sbjNo.includes(query)
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full md:w-1/2 bg-orange-500 hover:bg-orange-600">
          과목 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <DialogHeader>
          <DialogTitle>과목 검색</DialogTitle>
          <DialogDescription>추가할 과목을 검색하세요.</DialogDescription>
        </DialogHeader>
        <Input
          placeholder="과목명, 교수명, 학수번호로 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mt-4"
        />
        <ul className="space-y-2 h-[50vh] md:h-[70vh]">
          {filtered.map((course) => (
            <li
              key={course.id}
              className="cursor-pointer p-2 border rounded hover:bg-gray-100"
              onClick={() => onSelect(course)}
            >
              <div className="font-medium">{course.sbjName} ({course.sbjNo})</div>
              <div className="text-sm text-muted-foreground">
                {course.instructor} | {course.timeSlots.map(slot =>
                  `${slot.day} ${formatTime(slot.startMinutes)}~${formatTime(slot.endMinutes)}`
                ).join(", ")}
              </div>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}


