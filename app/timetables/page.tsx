'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllTimetables, deleteTimetable } from '@/lib/indexed-db-model';
import { TimetableData } from '@/types/model';
import { Trash2Icon } from 'lucide-react';

export default function TimetableListPage() {
  const [timetables, setTimetables] = useState<TimetableData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const all = await getAllTimetables();
      setTimetables(all);
      setLoading(false);
    })();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await deleteTimetable(id);
    setTimetables(prev => prev.filter(t => t.id !== id));
  };

  if (loading) return <p>불러오는 중...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-[80vh]">
      <h1 className="text-2xl font-bold mb-4">내 시간표 목록</h1>

      {timetables.length === 0 && <p>저장된 시간표가 없습니다.</p>}

      <ul>
        {timetables.map(tt => (
          <li key={tt.id} className="flex justify-between items-center py-2 border-b">
            <Link href={`/timetables/${tt.id}`} className="text-blue-600 underline text-lg">
              {tt.id}
            </Link>
            <button className="text-red-600" onClick={() => handleDelete(tt.id)}>
              <Trash2Icon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
