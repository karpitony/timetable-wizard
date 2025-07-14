import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Course } from '@/types/data';
import { formatTime } from '@/lib/format-time';

interface CourseTableProps {
  courses: Course[];
  removeCourse: (courseId: string) => void;
}

export default function CourseTable({
  courses,
  removeCourse
}: CourseTableProps) {
  return (
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
          <TableCell className='whitespace-pre-wrap'>{course.sbjName}</TableCell>
          <TableCell>{course.instructor}</TableCell>
          <TableCell className='whitespace-pre-wrap'>
            {course.timeSlots.map(slot =>
              `${slot.day} ${formatTime(slot.startMinutes)}~${formatTime(slot.endMinutes)}`
            ).join(", ")}
          </TableCell>
          <TableCell className="hidden md:table-cell whitespace-pre-wrap">{course.location}</TableCell>
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
  );
}