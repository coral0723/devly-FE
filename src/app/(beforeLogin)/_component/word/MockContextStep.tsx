import { Fragment } from "react";

export default function MockContextStep() {
  let text = "Encapsulation helps to protect an object's internal state by restricting direct access."

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
              1 / 5
            </span>
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${(1 / 5) * 100}%`}}
            />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="mt-20 space-y-4 md:mt-24 md:px-8">
        <div className="bg-white rounded-xl p-6 mx-4 shadow-sm max-w-3xl sm:mx-6 md:mx-auto">
          <div className="flex items-center gap-2 mb-2 text-gray-500 text-xs md:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" 
              className="w-4 h-4 md:w-6 md:h-6 flex-shrink-0"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 7v14"/>
              <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
            </svg>
            <span>출처: Object-Oriented Programming Guide</span>
          </div>
          <div className="text-sm mb-4 font-mono md:text-xl">
            {text.split(/(Encapsulation)/i).map((part, i) => (
              <Fragment key={i}>
                {part.toLowerCase() === "Encapsulation".toLowerCase() ? (
                  <span className="font-bold text-blue-600">
                    {part}
                  </span>
                ) : part}
              </Fragment>
            ))}
          </div>
          <div className="text-gray-600 text-xs border-t border-gray-100 pt-4 md:text-lg">
            캡슐화는 직접적인 접근을 제한함으로써 객체의 내부 상태를 보호하는 데 도움이 됩니다.
          </div>
        </div>

        {/* Bottom button */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-white border border-gray-200 z-10">
          <div className='max-w-xl mx-auto'>
            <button
              className=" w-full py-1 bg-green-500 text-white rounded-xl text-sm font-medium md:text-lg md:py-2"
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}