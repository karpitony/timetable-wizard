import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Course } from '@/types/data';
import { GroupData } from '@/types/group';
import { useCourses } from '@/hooks/useCourses';
import CourseSearchModal from '@/components/Wizard/CourseSearchModal';
import CourseTable from '@/components/Wizard/CourseTable';


interface GroupBoxProps {
  group: GroupData;
  groupIndex: number;
  removeGroup: (groupId: string) => void;
  updateGroupCourses: (groupId: string, newCourses: Course[]) => void;
}

function GroupBox ({ 
  group,
  groupIndex,
  removeGroup,
  updateGroupCourses
}: GroupBoxProps) {
  const { allCourses, isLoading, error } = useCourses();
  const courses = group.data || [];

  const addCourse = (course: Course) => {
    if (courses.find(c => c.id === course.id)) return;
    const updated = [...courses, course];
    updateGroupCourses(group.id, updated);
  };

  const removeCourse = (courseId: string) => {
    const updated = courses.filter(course => course.id !== courseId);
    updateGroupCourses(group.id, updated);
  };
  if (isLoading || !allCourses) return <p>과목 목록을 불러오는 중...</p>;
  if (error) return <p className="text-red-500">과목 목록 불러오기 실패: {error}</p>;
  return (
    <Card className="mb-6 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-orange-500 text-lg">
          그룹 {groupIndex + 1}
        </CardTitle>
        <Button
          variant="ghost"
          className="text-orange-500 hover:text-red-500"
          onClick={() => removeGroup(group.id)}
        >
          <Trash2 size={18} className="mr-1" />
          삭제
        </Button>
      </CardHeader>

      <CardContent>
        {courses.length > 0 ? (
          <CourseTable
            courses={courses}
            removeCourse={removeCourse}
          />
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">과목이 없습니다.</p>
        )}

        <div className="flex justify-center mt-4">
          <CourseSearchModal
            allCourses={allCourses}
            onSelect={addCourse}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupBox;
