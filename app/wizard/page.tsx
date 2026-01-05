'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import GroupBox from '@/components/Wizard/GroupBox';
import { GroupData } from '@/types/model';
import {
  addGroup as addGroupToDB,
  updateGroup as updateGroupInDB,
  deleteGroup as deleteGroupFromDB,
  getAllGroups,
} from '@/lib/indexed-db-model';
import { LAST_UPDATE, LAST_UPDATE_STRING } from '@/constants/storage';

const Wizard = () => {
  const [groups, setGroups] = useState<GroupData[]>([]);

  // 초기 로드 시 IndexedDB에서 그룹을 가져오기
  useEffect(() => {
    (async () => {
      const savedGroups = await getAllGroups();
      setGroups(savedGroups);
    })();
  }, []);

  const addGroup = async () => {
    const newGroup: GroupData = {
      id: Date.now().toString(),
      updatedAt: LAST_UPDATE_STRING,
      data: [],
    };

    setGroups(prev => [...prev, newGroup]);
    await addGroupToDB(newGroup);
  };

  const updateGroupCourses = (groupId: string, lectureKeys: string[]) => {
    setGroups(prev =>
      prev.map(g =>
        g.id === groupId ? { ...g, data: lectureKeys, updatedAt: LAST_UPDATE_STRING } : g,
      ),
    );

    updateGroupInDB({
      id: groupId,
      data: lectureKeys,
      updatedAt: LAST_UPDATE_STRING,
    });
  };

  const removeGroup = async (groupId: string) => {
    if (confirm('정말로 그룹을 삭제하시겠습니까?')) {
      setGroups(groups.filter(group => group.id !== groupId));
      await deleteGroupFromDB(groupId);
    }
  };

  const lastUpdateStr = LAST_UPDATE.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <section className="p-4 min-h-screen max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold">시간표 마법사</h2>
      <p className="mt-2 text-lg">
        여러 개의 그룹을 만들어 각 그룹에 과목을 추가하세요. 각 그룹에서 하나의 수업을 골라 시간표를
        생성합니다.
      </p>
      <p className="mt-2">마지막 업데이트: {lastUpdateStr}</p>

      <div className="w-full mt-10">
        {groups.map((group, index) => (
          <GroupBox
            key={group.id}
            group={group}
            groupIndex={index}
            removeGroup={removeGroup}
            updateGroupCourses={updateGroupCourses}
          />
        ))}

        <div className="mt-4 flex justify-between items-center px-10">
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded font-bold hover:bg-orange-400 transition-colors"
            onClick={addGroup}
          >
            그룹 추가
          </button>
          <Link
            className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-400 transition-colors"
            href="/wizard/result"
          >
            시간표 만들기
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Wizard;
