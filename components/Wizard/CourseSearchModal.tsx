'use client';

import { Course } from '@/types/data';
import { useRef, useState } from 'react';
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
import { useVirtualizer } from '@tanstack/react-virtual';

interface Props {
  allCourses: Course[];
  onSelect: (course: Course) => void;
}

export default function CourseSearchModal({ allCourses, onSelect }: Props) {
  const [query, setQuery] = useState('');
  if (!allCourses) return null;
  const filtered = allCourses.filter(
    c =>
      c.sbjName.toLowerCase().includes(query.toLowerCase()) ||
      c.instructor.toLowerCase().includes(query.toLowerCase()) ||
      c.id.toLowerCase().includes(query.toLowerCase()),
  );

  const parentRef = useRef<HTMLUListElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80, // 각 item 높이 추정값 (px)
    overscan: 10,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full md:w-1/2 bg-orange-500 hover:bg-orange-600">과목 추가</Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <DialogHeader>
          <DialogTitle>과목 검색</DialogTitle>
          <DialogDescription>추가할 과목을 검색하세요.</DialogDescription>
        </DialogHeader>

        <Input
          placeholder="과목명, 교수명, 학수번호로 검색"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="mt-4"
        />

        <ul ref={parentRef} className="relative h-[50vh] md:h-[70vh] overflow-auto">
          <div style={{ height: rowVirtualizer.getTotalSize(), position: 'relative' }}>
            {rowVirtualizer.getVirtualItems().map(virtualRow => {
              const course = filtered[virtualRow.index];

              return (
                <li
                  key={course.id}
                  onClick={() => onSelect(course)}
                  className="absolute left-0 right-0 cursor-pointer p-2 border rounded hover:bg-gray-100 flex flex-col justify-center"
                  style={{
                    top: 0,
                    transform: `translateY(${virtualRow.start}px)`,
                    height: `${virtualRow.size}px`,
                  }}
                >
                  <div className="font-medium">
                    {course.sbjName} ({course.id})
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {course.instructor} |{' '}
                    {course.timeSlots
                      .map(
                        slot =>
                          `${slot.day} ${formatTime(slot.startMinutes)}~${formatTime(slot.endMinutes)}`,
                      )
                      .join(', ')}
                  </div>
                </li>
              );
            })}
          </div>
        </ul>
      </DialogContent>
    </Dialog>
  );
}
