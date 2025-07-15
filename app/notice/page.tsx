const notices = [
  { id: 1, title: "신규 기능 추가", date: "2025-07-15", 
    content: "1. \"시간표 가리기\" 기능이 추가되었습니다.\n " +
              "스위치로 쉽게 키고 끌 수 있으며, 에브리타임 등에 시간표를 공유할 때 하나하나 가릴 필요 없이 편하게 사용하세요!\n\n" +
              "2. 강의 검색에서 대소문자 구분 없이 검색할 수 있도록 개선했습니다.\n " +
              "이제 과목명이나 교수명에 대소문자를 신경 쓰지 않고 검색할 수 있습니다.\n\n"
  },
];

export default function NoticePage() {
  return (
    <div className="max-w-4xl mx-auto p-4 min-h-[80vh]">
      <h1 className="text-2xl font-bold mb-4">공지사항</h1>
      {notices.length === 0 ? (
        <p>새로운 공지사항이 없어요! 곧 좋은 소식으로 찾아뵙겠습니다 :)</p>
      ) : (
        <ul className="space-y-4 max-h-[60vh] overflow-auto">
          {notices.map(({ id, title, date, content }) => (
            <li key={id} className="border p-4 rounded shadow-sm">
              <h2 className="font-semibold text-lg">{title}</h2>
              <p className="text-sm text-gray-500 mb-2">{date}</p>
<div>
  {content.split('\n').map((line, idx) => {
    const trimmed = line.trim();

    if (trimmed === '') {
      return <div key={idx} className="h-4" />;
    }

    const isNumbered = /^\d+\./.test(trimmed);
    return (
      <p key={idx} className="mb-1">
        {isNumbered ? (
          <span className="font-bold">{trimmed}</span>
        ) : (
          trimmed
        )}
      </p>
    );
  })}
</div>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
