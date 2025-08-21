import { Fragment } from "react";
import MockChangedFiles from "./MockChangedFiles";

type Props = {
  onModal: boolean;
}

export default function MockPr({ onModal }: Props) {
  return (
    <div className="flex-grow relative overflow-hidden w-full h-full bg-gray-50">

      {/* Modal */}
      {onModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 overflow-hidden">
          <div className="h-[calc(100vh-6rem)] flex flex-col bg-gray-50 max-w-4xl overflow-hidden sm:rounded-lg sm:mx-8 sm:my-12">
            <div className="p-4 mb-4 bg-white border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-800">변경된 파일</h3>
              <button
                className="px-3 py-1 text-sm border border-gray-300 rounded"
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
              <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full md:text-sm">
                Step 1/3
              </span>
            </div>
            <div className="flex flex-1 justify-end gap-2 relative group inline-block lg:invisible">
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
          <h1 className="text-base font-semibold text-gray-900 md:text-lg">
            Refactor login flow to improve readability and error handling
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto scrollbar-hide mt-32 md:mt-28">
        <div className="lg:grid grid-cols-2">
          <div className="space-y-4 mx-auto max-w-xl lg:max-w-none lg:mx-0">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium mb-2">PR 설명 작성</h3>
              <p className="text-sm text-gray-600">
                변경된 파일을 확인하여 PR을 작성해 주세요.
              </p>
            </div>
            <div className="relative">
              <div
                className="w-full h-32 p-3 border border-gray-300 rounded-lg text-sm bg-white text-base whitespace-pre-wrap overflow-auto"
              >
                refactor: 로그인 흐름 리팩토링{'\n\n'}- 가독성과 오류 처리 개선
              </div>
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                0/500
              </div>
            </div>
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm">
                <h4 className="font-medium mb-2">AI 리뷰</h4>
                <div className="bg-gray-50 p-3 rounded border border-gray-200 text-gray-600 whitespace-pre-line">
                  <Fragment>
                    좋은 지적입니다. 해당 부분은 사용자 경험과 코드 유지보수 측면에서 더 고민해볼 여지가 있는 것 같습니다.
                  </Fragment>
                </div>
              </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 p-2 bg-white border border-gray-200 z-10">
              <div className="max-w-xl mx-auto">
                <button
                  className="w-full py-3 bg-purple-600 text-white rounded-lg text-lg font-medium"
                  disabled={true}
                >
                  다음 단계
                </button>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <MockChangedFiles/>
          </div>
        </div>
      </div>
    </div>
  )
}