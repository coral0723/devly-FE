export default function LearningSection() {
  return (
    <>
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-blue-100 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>
            </svg>
        </div>
        <h1 className="text-2xl font-bold mb-3">
            오늘의 CS/개발 지식
        </h1>
        <p className="text-gray-600 mb-2">
            실무에 필요한 CS/개발 지식을
        </p>
        <p className="text-gray-600">
            쉽게 이해하고 학습하세요
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
          </svg>
          <h3 className="font-medium mb-1">쉬운 설명</h3>
          <p className="text-sm text-gray-500">복잡한 개념을 쉽게 이해해보세요</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>
          </svg>
          <h3 className="font-medium mb-1">실무 연계</h3>
          <p className="text-sm text-gray-500">현업에서 어떻게 쓰이는지 알아보세요</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-orange-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
            </svg>
          </div>
          <div>
            <h3 className="font-medium">오늘의 학습</h3>
            <p className="text-sm text-gray-500">3개의 새로운 지식</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
          학습을 완료하면 150 XP를 획득할 수 있어요!
        </div>
      </div>
  </>
  )
}