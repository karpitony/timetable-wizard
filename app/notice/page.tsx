const notices = [
  {
    id: 4,
    title: '2026년 1학기 종합강의시간표 데이터 반영',
    date: '2025-01-13',
    content:
      '1. 2026년 1학기 종합강의시간표 데이터가 반영되었습니다.\n ' +
      '시간표 작성 시 최신 데이터를 이용할 수 있습니다.\n\n' +
      '2. 시간표에 다시 교수님 성함을 표시합니다.\n' +
      '사용자 여러분의 피드백을 반영하여 교수님 성함을 다시 표시하기로 결정했습니다. ' +
      '시간표를 공유할 때 불편함이 없도록 "시간표 가리기" 기능도 함께 제공하고 있으니 필요에 따라 활용해 주세요.\n\n' +
      '더 나은 서비스를 제공하기 위해 항상 노력하겠습니다. 감사합니다!',
  },
  {
    id: 3,
    title: '2026년 1학기 시간표 데이터 업데이트',
    date: '2026-01-04',
    content:
      '2026년 1학기 시간표 데이터가 업데이트되었습니다.\n ' +
      'ndrims의 강의실별시간표조회 데이터로 최종 시간표와 차이가 있을 수 있습니다.\n\n' +
      '사용해주셔서 감사하고, 새해 복 많이 받으세요! :)',
  },
  {
    id: 2,
    title: '경쟁률 보기 개선 및 즐겨찾기 기능 추가',
    date: '2025-07-22',
    content:
      '1. 강의 경쟁률 페이지가 추가되었습니다.\n' +
      '내 강의 경쟁률도 확인하고, 원하는 강의를 즐겨찾기에 추가해 나만의 리스트를 만들고 쉽게 비교하세요.\n\n' +
      '2. 전체 강의는 한 번에 모두 보지 않고 "더 보기" 버튼으로 점진적으로 로드됩니다.\n' +
      '2천개 이상의 강의가 전부 로드되면 렉이 발생할 수 있어 30개씩 나눠서 로드됩니다.\n\n' +
      '3. IndexedDB를 활용해 즐겨찾기가 브라우저에 안전하게 저장됩니다.\n' +
      '페이지를 닫아도 즐겨찾기 목록이 유지됩니다 :)',
  },
  {
    id: 1,
    title: '신규 기능 추가',
    date: '2025-07-15',
    content:
      '1. "시간표 가리기" 기능이 추가되었습니다.\n ' +
      '스위치로 쉽게 키고 끌 수 있으며, 에브리타임 등에 시간표를 공유할 때 하나하나 가릴 필요 없이 편하게 사용하세요!\n\n' +
      '2. 강의 검색에서 대소문자 구분 없이 검색할 수 있도록 개선했습니다.\n ' +
      '이제 과목명이나 교수명에 대소문자를 신경 쓰지 않고 검색할 수 있습니다.\n\n',
  },
];

export default function NoticePage() {
  return (
    <div className="max-w-4xl mx-auto p-4 min-h-[80vh]">
      <h1 className="text-2xl font-bold mb-4">공지사항</h1>
      {notices.length === 0 ? (
        <p>새로운 공지사항이 없어요! 곧 좋은 소식으로 찾아뵙겠습니다 :)</p>
      ) : (
        <ul className="space-y-4 min-h-[60vh] overflow-auto">
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
                      {isNumbered ? <span className="font-bold">{trimmed}</span> : trimmed}
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
