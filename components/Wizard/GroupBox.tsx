'use client';

import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Trash2, PlusCircle } from 'lucide-react';
import { formatTime } from '@/lib/format-time';
import { Course } from '@/types/data';
import { useCourses } from '@/hooks/useCourses';
import CourseSearchModal from '@/components/Wizard/CourseSearchModal';

// import { GroupData } from '@/types/group';

interface GroupBoxProps {
  groupId: string;
  groupIndex: number;
  removeGroup: (groupId: string) => void;
}

function GroupBox ({ groupId, groupIndex, removeGroup }: GroupBoxProps) {
  const allCourses = useCourses();
  const [courses, setCourses] = useState<Course[]>([]);

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        id: Date.now().toString(),
        sbjNo: 'CS101',
        sbjName: '새 과목',
        instructor: '교수님',
        location: '장소',
        timeSlots: [
          {
            day: '월',
            startMinutes: 540, // 9:00 AM
            endMinutes: 600,   // 10:00 AM
            periodStart: '1교시',
            periodEnd: '2교시',
          },
        ],
      },
    ]);
  };

  const removeCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  return (
    <Card className="mb-6 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-orange-500 text-lg">
          그룹 {groupIndex + 1}
        </CardTitle>
        <Button
          variant="ghost"
          className="text-orange-500 hover:text-red-500"
          onClick={() => removeGroup(groupId)}
        >
          <Trash2 size={18} className="mr-1" />
          삭제
        </Button>
      </CardHeader>

      <CardContent>
        {courses.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>학수번호</TableHead>
                <TableHead>과목명</TableHead>
                <TableHead className="w-[100px]">교수명</TableHead>
                <TableHead>시간</TableHead>
                <TableHead className="hidden md:table-cell">장소</TableHead>
                <TableHead className="w-[40px] text-center">삭제</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                <TableCell>{course.sbjNo}</TableCell>
                <TableCell>{course.sbjName}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>
                  {course.timeSlots.map(slot =>
                    `${slot.day} ${formatTime(slot.startMinutes)}~${formatTime(slot.endMinutes)}`
                  ).join(", ")}
                </TableCell>
                <TableCell className="hidden md:table-cell">{course.location}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-orange-500 hover:text-red-500"
                      onClick={() => removeCourse(course.id)}
                    >
                      ×
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">과목이 없습니다.</p>
        )}

        <div className="flex justify-center mt-4">
          <CourseSearchModal
            allCourses={allCourses}
            onSelect={(course) => setCourses([...courses, course])}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupBox;
