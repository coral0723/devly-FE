"use client"

import { Fragment } from "react";
import Header from "./Header";
import ContentsWrapper from "@/app/_component/ContentsWrapper";
import WhiteBox from "../../../_component/WhiteBox";

export default function MockWordQuizStep() {
  const text = "Encapsulation helps to protect an object's internal state by restricting direct access."
  const distractors = [
    "Encapsulation",
    "Abstraction",
    "Polymorphism",
    "Inheritance"
  ];

  return (
    <div className="flex-grow relative w-full h-full overflow-hidden bg-gray-50">
      <Header
        currentStep={1}
        endStep={5}
      />

      <ContentsWrapper
        headerMobileHeight={60}
        headerDesktopHeight={68}
      >
        <WhiteBox>
          <div className="flex items-center gap-2 mb-4 text-gray-500 text-[8px] md:text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" 
                className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 7v14"/>
                <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
              </svg>
              <span>출처: Object-Oriented Programming Guide</span>
          </div>
          <div className="text-xs mb-1 font-mono md:text-base">
            {text.split(/(Encapsulation)/i).map((part, i) => (
              <Fragment key={i}>
                {part.toLowerCase() === "Encapsulation".toLowerCase() ? (
                  <div className="inline-block border-2 border-gray md:p-1">
                    <span className="font-bold text-blue-600">
                      <span className="opacity-0">{part}</span>
                    </span>
                  </div>
                ) : part}
              </Fragment>
            ))}
          </div>
        </WhiteBox>
        
        <WhiteBox>
          <div className="space-y-2 md:space-y-4">
            {distractors.map((distractor, idx) => (
              <button
                key={idx}
                className={`w-full flex items-center gap-4 p-3 md:p-4 text-left border rounded-lg transition-all`}
                disabled={true}
              >
                <div className={`w-5 h-5 md:w-7 md:h-7 flex items-center justify-center rounded-full border-2 flex-shrink-0`}>
                  <span className="text-gray-500 text-xs md:text-base">{idx + 1}</span>
                </div>
                <span className="text-xs md:text-base">{distractor}</span>
              </button>
            ))}
          </div>
        </WhiteBox>
      </ContentsWrapper>

      {/* Bottom Button */}
      <div className="absolute bottom-0 left-0 right-0 bg-white p-2 border border-gray-200 z-10">
        <div className="max-w-xl mx-auto">
          <button
            className={`w-full py-1 text-white text-xs font-medium rounded-xl transition-all bg-gray-300 cursor-not-allowed md:text-lg md:py-2`}
            disabled={true}
          >
            다음 문제
          </button>
        </div>
      </div>

    </div>
  )
}