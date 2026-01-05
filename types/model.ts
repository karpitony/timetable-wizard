import { Course } from '@/types/data';

export interface GroupData {
  id: string;
  updatedAt: string;
  data: string[]; // {sbjNo}-{dvcls} 학수번호-분반으로 구성된 외래키
  // data: Course[];
}

export interface CourseGroupData {
  data: (Course | undefined)[];
  id: string;
  updatedAt: string;
}

export interface TimetableData {
  id: string;
  updatedAt: string;
  data: string[]; // {sbjNo}-{dvcls} 학수번호-분반으로 구성된 외래키
  hasIssue?: boolean;
  // data: Course[];
}
