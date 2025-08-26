export default function MockKnowledgeStep() {
  return (
    <div className="flex-grow relative w-full h-full bg-gray-50">
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
          <div className="flex items-center gap-4 mb-2 md:mb-4">
            <h1 className="text-sm md:text-lg font-bold flex-1">스레드의 기본 개념</h1>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex border-b">
            <div
              className={`flex-1 flex justify-center rounded-t-lg bg-blue-50 border-b-2 border-blue-500`}
            >
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
                  <path d="M12 7v14"/>
                  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
                </svg>
                <span>문제</span>
              </button>
            </div>
          </div>

          {/* Content Based on Active Tab */}
          <div className="mt-4">
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed text-[9px] md:text-base">
                스레드는 프로세스 내에서 실행되는 가장 작은 실행 단위입니다.<br/>
                하나의 프로세스는 여러 개의 스레드를 가질 수 있으며,<br/> 
                각 스레드는 같은 프로세스의 메모리를 공유합니다.<br/>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}