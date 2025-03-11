type Props = {
  wordTotal: string;
}

export default function ReviewSection({wordTotal}: Props) {
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
          오답 단어 복습하기 
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
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855ed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>
            <path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>
          </svg>
          <h3 className="font-medium mb-1">발음 복습</h3>
          <p className="text-sm text-gray-500">틀린 단어의 발음을 다시 확인하세요</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>
          </svg>
          <h3 className="font-medium mb-1">예문 복습</h3>
          <p className="text-sm text-gray-500">실제 사용 예시를 다시 학습하세요</p>
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
            <h3 className="font-medium">복습할 단어</h3>
            <p className="text-sm text-gray-500">{wordTotal}개의 오답 단어</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
            복습을 완료하면 100 XP를 획득할 수 있어요!
        </div>
      </div>
    </>
  )
}