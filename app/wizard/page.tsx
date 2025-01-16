'use client';
import { useState } from "react";
import GroupBox from "@/components/Wizard/GroupBox";

const Wizard = () => {
  const [groups, setGroups] = useState<string[]>([]);

  const addGroup = () => {
    setGroups([...groups, Date.now().toString()]);
  };

  const removeGroup = (groupId: string) => {
    if (confirm("정말로 그룹을 삭제하시겠습니까?")) {
      setGroups(groups.filter((id) => id !== groupId));
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen max-w-3xl mx-auto">
      {groups.map((groupId, index) => (
        <GroupBox
          key={groupId}
          groupId={groupId}
          groupIndex={index}
          removeGroup={removeGroup}
        />
      ))}

      <div className="mt-4">
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded w-full md:w-auto"
          onClick={addGroup}
        >
          그룹 추가
        </button>
      </div>
    </div>
  );
};

export default Wizard;
