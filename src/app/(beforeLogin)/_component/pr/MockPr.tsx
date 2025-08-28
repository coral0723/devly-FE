import { Fragment } from "react";
import MockChangedFiles from "./MockChangedFiles";
import ContentsWrapper from "@/app/_component/ContentsWrapper";

type Props = {
  onModal: boolean;
}

export default function MockPr({ onModal }: Props) {
  return (
    <div className="flex-grow relative overflow-hidden w-full h-full bg-gray-50">

      {/* Modal */}
      {onModal && (
        <div className="absolute inset-0 bg-black bg-opacity-30 z-20 overflow-hidden">
          <div className="h-[calc(100vh-6rem)] flex flex-col bg-gray-50 max-w-4xl overflow-hidden sm:rounded-lg">
            <div className="p-4 mb-4 bg-white border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-sm md:text-lg text-gray-800">변경된 파일</h3>
              <button
                className="px-2 py-0.7 md:px-3 md:py-1 text-sm border border-gray-300 rounded"
                disabled={true}
              >
                닫기
              </button>
            </div>
            <MockChangedFiles/>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white p-4 border-b border-gray-200 shadow-sm">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between relative w-full">
            <div className="flex items-center gap-2 flex-1">
              <button
                className="p-2 -ml-2 rounded-full"
                disabled={true}
              >
                <svg xmlns="http://www.w3.org/2000/svg" 
                  className="w-4 h-4 md:w-6 md:h-6"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/>
                  <path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>
            <div className="flex-1 flex justify-center">
              <span className="px-2 py-1 text-[10px] bg-purple-100 text-purple-800 rounded-full md:text-sm">
                Step 1/3
              </span>
            </div>
            <div className="flex flex-1 justify-end gap-2 relative group">
              <button
                className="p-2 -ml-2 rounded-full"
                disabled={true}
              >
                <svg xmlns="http://www.w3.org/2000/svg" 
                  className="text-purple-800 w-4 h-4 md:w-6 md:h-6"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" >
                  <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                  <path d="m5 12-3 3 3 3"/>
                  <path d="m9 18 3-3-3-3"/>
                </svg>
              </button>
            </div>
          </div>
          <h1 className="text-xs md:text-base font-semibold text-gray-900">
            Refactor login flow to improve readability and error handling
          </h1>
        </div>
      </div>

      {/* Content */}
      <ContentsWrapper
        headerMobileHeight={109}
        headerDesktopHeight={133}
      >
        <div className="bg-white p-2 md:p-4 rounded-lg border border-gray-200">
          <h3 className="text-[10px] md:text-base font-medium mb-2">PR 설명 작성</h3>
          <p className="text-[8px] md:text-sm text-gray-600">
            변경된 파일을 확인하여 PR을 작성해 주세요.
          </p>
        </div>
        <div className="relative">
          <div
            className="w-full h-22 md:h-32 p-2 md:p-3 border border-gray-300 rounded-lg text-[8px] md:text-sm bg-white whitespace-pre-wrap overflow-auto"
          >
            refactor: 로그인 흐름 리팩토링{'\n'}- 가독성과 오류 처리 개선
          </div>
          <div className="absolute bottom-2 right-2 text-[6px] md:text-xs text-gray-500">
            0/500
          </div>
        </div>
        <div className="mt-4 bg-white border border-gray-200 rounded-lg p-2 md:p-4">
            <h4 className="font-medium mb-2 text-[10px] md:text-sm">AI 리뷰</h4>
            <div className="bg-gray-50 p-2 md:p-3 rounded border border-gray-200 text-gray-600 whitespace-pre-line text-[8px] md:text-xs">
              <Fragment>
                좋은 지적입니다. 해당 부분은 사용자 경험과 코드 유지보수 측면에서 더 고민해볼 여지가 있는 것 같습니다.
              </Fragment>
            </div>
        </div>
        <div className="hidden">
          <MockChangedFiles/>
        </div>
      </ContentsWrapper>

      {/* Bottom button */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-white border-t border-gray-200 z-10">
        <div className="max-w-xl mx-auto">
          <button
            className="w-full py-1 md:py-2 bg-purple-600 text-white rounded-xl text-xs md:text-lg font-medium"
            disabled={true}
          >
            다음 단계
          </button>
        </div>
      </div>
    </div>
  )
}