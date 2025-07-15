const notices = [
  { id: 1, title: "신규 기능 추가", date: "2025-07-15", 
    content: "\"시간표 가리기\" 기능이 추가되었습니다.\n\n " + "에브리타임 등에 시간표를 공유할 때 하나하나 가릴 필요 없이 편하게 사용하세요!" 
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
              <p className="whitespace-pre-line">{content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
