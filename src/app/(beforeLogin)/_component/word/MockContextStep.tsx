import { Fragment } from "react";
import Header from "./Header";
import ContentsWrapper from "../ContentsWrapper";
import WhiteBox from "../WhiteBox";

export default function MockContextStep() {
  const text = "Encapsulation helps to protect an object's internal state by restricting direct access."

  return (
    <div className="flex-grow relative w-full h-full bg-gray-50">
      <Header
        currentStep={1}
        endStep={5}
      />
      
      <ContentsWrapper page="word">
        <WhiteBox>
          <div className="flex items-center gap-2 mb-2 text-gray-500 text-[8px] md:text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" 
              className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 7v14"/>
              <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
            </svg>
            <span>출처: Object-Oriented Programming Guide</span>
          </div>
          <div className="text-xs mb-4 font-mono md:text-base">
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
          <div className="text-gray-600 text-xs border-t border-gray-100 pt-4 md:text-base">
            캡슐화는 직접적인 접근을 제한함으로써 객체의 내부 상태를 보호하는 데 도움이 됩니다.
          </div>
        </WhiteBox>
      </ContentsWrapper>

      {/* Bottom button */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-white border border-gray-200 z-10">
        <div className='max-w-xl mx-auto'>
          <button
            className="w-full py-1 bg-green-500 text-white rounded-xl text-xs font-medium md:text-lg md:py-2"
            disabled={true}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  )
}