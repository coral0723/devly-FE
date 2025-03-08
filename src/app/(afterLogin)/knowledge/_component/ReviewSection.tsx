type Props = {
  KnowledgeTotal: string;
}

export default function ReviewSection({KnowledgeTotal}: Props) {
  return (
    <>
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-rose-100 rounded-2xl mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
          <path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>
        </svg>
        </div>
        <h1 className="text-2xl font-bold mb-3">
          오답 CS/개발 지식 복습하기 
        </h1>
        <p className="text-gray-600 mb-2">
          틀린 문제를 다시 한 번
        </p>
        <p className="text-gray-600">
          꼼꼼히 복습해보세요
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
          </svg>
          <h3 className="font-medium mb-1">지식 복습</h3>
          <p className="text-sm text-gray-500">틀린 지식의 내용을 다시 확인하세요</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
          </svg>
          <h3 className="font-medium mb-1">코드 이해</h3>
          <p className="text-sm text-gray-500">핵심 코드 패턴과 로직을 정리하세요</p>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-rose-100 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>
          </svg>
          </div>
          <div>
            <h3 className="font-medium">복습할 지식</h3>
            <p className="text-sm text-gray-500">{KnowledgeTotal}개의 오답 지식</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
            복습을 완료하면 150 XP를 획득할 수 있어요!
        </div>
      </div>
    </>
  )
}