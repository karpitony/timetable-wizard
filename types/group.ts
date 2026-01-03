import { Course } from '@/types/data';

export interface GroupData {
  id: string; // 예: "group-1"
  data: Course[]; // Course 배열
}
