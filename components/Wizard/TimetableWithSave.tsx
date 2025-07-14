'use client';

import { useState } from "react";
import { addTimetable } from "@/lib/indexed-db-model";
import { Course } from "@/types/data";

interface TimetableWithSaveProps {
  courses: Course[];
}

export default function TimetableWithSave({ courses }: TimetableWithSaveProps) {
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      alert("시간표 이름을 입력해주세요.");
      return;
    }
    setSaving(true);
    try {
      await addTimetable({ id: name.trim(), data: courses });
      alert(`"${name}" 시간표가 저장되었습니다.`);
      setName("");
      setShowInput(false);  // 저장 완료 후 입력창 숨기기
    } catch (e) {
      alert("저장 실패!");
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-2 w-full flex justify-end">
      {!showInput ? (
        <button
          className="btn btn-primary bg-orange-500 text-white font-bold hover:bg-orange-400 px-4 py-2 rounded-md"
          onClick={() => setShowInput(true)}
        >
          저장하기
        </button>
      ) : (
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className="border px-2 py-1 rounded text-sm"
            placeholder="시간표 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={saving}
            autoFocus
          />
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "저장 중..." : "확인"}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setShowInput(false);
              setName("");
            }}
            disabled={saving}
          >
            취소
          </button>
        </div>
      )}
    </div>
  );
}
