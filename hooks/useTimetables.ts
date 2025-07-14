import { useState } from "react";
import { GroupData } from "@/types/group";
import { Course } from "@/types/data";
import { generateTimetables } from "@/lib/generate-timetables";

interface TimetableResult {
  timetable: Course[];
  score: number;
}

export function useTimetables() {
  const [isLoading, setIsLoading] = useState(false);
  const [timetables, setTimetables] = useState<TimetableResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generate = async (groups: GroupData[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const timeTables = generateTimetables(groups);
      setTimetables(timeTables);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generate,
    timetables,
    isLoading,
    error,
  };
}
