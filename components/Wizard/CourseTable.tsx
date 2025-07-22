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
  buttonType: "remove" | "add";
  removeCourse?: (courseId: string) => void;
  addCourse?: (course: Course) => void;
  isCompetitionEnabled?: boolean;
}

export default function CourseTable({
  courses,
  buttonType = "remove",
  removeCourse,
  addCourse,
  isCompetitionEnabled = false
}: CourseTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>학수번호</TableHead>
          <TableHead>과목명</TableHead>
          <TableHead className="w-[80px]">교수명</TableHead>
          <TableHead>시간</TableHead>
          {!isCompetitionEnabled && 
            <TableHead className="hidden md:table-cell">장소</TableHead>
          }
          {isCompetitionEnabled && (
            <>
              <TableHead className="w-[60px] text-center">신청자 수</TableHead>
              <TableHead className="w-[60px] text-center">정원</TableHead>
              <TableHead className="w-[60px] text-center">경쟁률</TableHead>
            </>
          )}
          {buttonType === "remove" && <TableHead className="w-[60px] text-center">삭제</TableHead>}
          {buttonType === "add" && <TableHead className="w-[60px] text-center">추가</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course) => (
          <TableRow key={course.id}>
            <TableCell>{course.id}</TableCell>
            <TableCell className='whitespace-pre-wrap'>{course.sbjName}</TableCell>
            <TableCell>{course.instructor}</TableCell>
            <TableCell className='whitespace-pre-wrap'>
              {course.timeSlots.map(slot =>
                `${slot.day} ${formatTime(slot.startMinutes)}~${formatTime(slot.endMinutes)}`
              ).join(", ")}
            </TableCell>
            {!isCompetitionEnabled && 
              <TableCell className="hidden md:table-cell whitespace-pre-wrap">{course.location}</TableCell>
            }
            {isCompetitionEnabled && (
              <>
                <TableHead className="w-[60px] text-center">{course.currentParticipant}</TableHead>
                <TableHead className="w-[60px] text-center">{course.fullParticipant}</TableHead>
                <TableHead className="w-[60px] text-center">
                  {(course.fullParticipant && course.currentParticipant) ? (course.currentParticipant / course.fullParticipant).toFixed(2) : "error"}
                </TableHead>
              </>
            )}
            <TableCell className="text-center">
              {buttonType === "remove" ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-orange-500 hover:text-red-500"
                  onClick={() => removeCourse?.(course.id)}
                >
                  ×
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-500 hover:text-blue-400"
                  onClick={() => addCourse?.(course)}
                >
                  +
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}