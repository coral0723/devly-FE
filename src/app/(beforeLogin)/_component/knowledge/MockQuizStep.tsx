export default function MockQuizStep() {
  const distractors = [
    {
      id: 1,
      distractor: "프로세스의 메모리를 공유한다",
    },
    {
      id: 2,
      distractor: "각 스레드는 독립적인 메모리 공간을 가진다",
    },
    {
      id: 3,
      distractor: "동시에 여러 작업을 수행할 수 있다",
    },
    {
      id: 4,
      distractor: "스택 영역은 스레드마다 독립적이다",
    },
  ];

  return (
    <div className="flex-grow overflow-hidden relative w-full h-full bg-gray-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white border-b border-gray-200">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-2">
            <button
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" 
                className="w-4 h-4 md:w-6 md:h-6"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/>
                <path d="m6 6 12 12"/>
              </svg>
            </button>
            <span className="text-xs text-gray-500 md:text-base">
              1 / 3
            </span>
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${(1 / 3) * 100}%`}}
            />
          </div>
        </div>
      </div>

      {/* Content */}
        <div className="pt-[70px] md:pt-24 space-y-4 md:px-4">
        {/* Topic Header with Progress */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm mx-2 md:mx-4 shadow-sm max-w-3xl sm:mx-6 md:mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-sm md:text-lg font-bold flex-1">스레드의 기본 개념</h1>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex border-b">
            <div
              className={`flex-1 flex justify-center rounded-t-lg`}
            >
              <button
                className={`flex items-center py-1 space-x-1 text-[9px] font-medium rounded-t-lg transition-colors text-gray-500 md:px-2 md:py-3 md:text-sm md:space-x-2 md:py-2 `}
                disabled={true}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-3 h-3 md:w-4 md:h-4"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round">
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                  <path d="M9 18h6"/>
                  <path d="M10 22h4"/>
                </svg>
                <span>개념</span>
              </button>
            </div>
            <div
              className={`flex-1 flex justify-center rounded-t-lg`}>
              <button
                className={`flex items-center py-1 space-x-1 text-[9px] font-medium rounded-t-lg transition-colors text-gray-500 md:px-2 md:py-3 md:text-sm md:space-x-2 md:py-2 `}
                disabled={true}  
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-3 h-3 md:w-4 md:h-4"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round">
                  <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                  <path d="m5 12-3 3 3 3"/>
                  <path d="m9 18 3-3-3-3"/>
                </svg>
                <span>코드</span>
              </button>
            </div>
            <div
              className={`flex-1 flex justify-center rounded-t-lg border-blue-500 bg-blue-50 border-b-2`}>
              <button
                className={`flex items-center py-1 space-x-1 text-[9px] font-medium transition-colors text-blue-600 md:px-2 md:py-3 md:text-sm md:space-x-2 md:py-2`}
                disabled={true}  
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-3 h-3 md:w-4 md:h-4"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round">
                  <path d="M12 7v14"/>
                  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
                </svg>
                <span>문제</span>
              </button>
            </div>
          </div>

          {/* Content Based on Active Tab */}
          <div className="space-y-4 mt-4">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 md:p-4 mb-4">
              <h2 className="text-xs md:text-base font-semibold text-blue-800 mb-2">문제</h2>
              <p className="text-blue-900 text-[9px] md:text-sm">다음 중 스레드의 특징이 아닌 것은?</p>
            </div>

            <div className="space-y-2 md:space-y-4">
              {distractors.map((distractor, idx) => (
                <button
                  key={distractor.id}
                  className={`w-full flex items-center gap-4 p-3 md:p-4 text-left border rounded-lg transition-all`}
                  disabled={true}
                >
                  <div className={`w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full border-2 flex-shrink-0 md:w-8 md:h-8`}>
                    <span className="text-gray-500 text-xs md:text-sm">{idx + 1}</span>
                  </div>
                  <span className="text-xs md:text-base">{distractor.distractor}</span>
                </button>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-white p-2 border border-gray-200 z-10">
              <div className="max-w-xl mx-auto">
                <button
                  className={`w-full py-1 md:py-3 text-white rounded-xl text-sm md:text-lg font-medium transition-all bg-gray-300 cursor-not-allowed`}
                  disabled={true}
                >
                  다음 문제
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}