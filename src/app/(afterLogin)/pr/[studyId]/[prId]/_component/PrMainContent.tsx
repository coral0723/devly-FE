"use client"

import { PrComments } from "@/model/pr/PrComments"
import { PrHistory } from "@/model/pr/prHistory"
import ReviewAssessment from "./ReviewAssessment";
import { Feedback } from "@/model/pr/Feedback";
import LoadingSpinner from "@/app/_component/LoadingSpinner";
import { useRouter } from "next/navigation";
import ChangedFiles from "./ChangedFiles";
import { PrChangedFiles } from "@/model/pr/PrChangedFiles";
import WhiteBox from "@/app/_component/WhiteBox";

type Props = {
  currentStep: number,
  prComments: PrComments,
  prHistory?: PrHistory,
  replies: string[],
  feedbacks: Feedback[],
  isPostAnswerLoading: boolean,
  prChangedFiles: PrChangedFiles,
  setReplies: (replies: string[]) => void,
  setCurrentStep: (step: number) => void,
  postAnswer: (params: {commentId: number, answer: string}) => void
}

export default function PrMainContent({ currentStep, prComments, prHistory, replies, feedbacks, isPostAnswerLoading, prChangedFiles, setReplies, setCurrentStep, postAnswer }: Props) {
  const router = useRouter();
  const MAX_CHAR_LIMIT = 500;

  const getCharCount = (text: string) => {
    return text ? text.length : 0;
  };
  
  const currentReplyLength = getCharCount(prHistory
    ? prHistory.answers[currentStep - 1]
    : replies[currentStep - 1] || ''
  );
  
  // 현재 텍스트가 있는지 확인하는 함수
  const hasText = () => {
    if (prHistory) return true; // 이미 제출된 히스토리가 있으면 항상 true
    return (replies[currentStep - 1] && replies[currentStep - 1].trim().length > 10);
  };
  
  // 버튼 스타일을 결정하는 함수
  const getButtonStyle = () => {
    if (isPostAnswerLoading) return "w-full py-3 bg-purple-600 text-white rounded-lg md:text-lg font-medium hover:bg-purple-700";
    if (hasText()) return "w-full mx-auto py-3 bg-purple-600 text-white rounded-lg md:text-lg font-medium hover:bg-purple-700";
    return "w-full mx-auto py-3 bg-gray-300 text-white rounded-lg md:text-lg font-medium cursor-not-allowed";
  };
  
  return (
    <>
      <div className="lg:grid grid-cols-2">
        <div className="space-y-4 mx-auto max-w-xl lg:max-w-none lg:mx-0">
          <WhiteBox>
            <h3 className="font-medium mb-2 text-sm md:text-base">{currentStep === 1 ? "PR 설명 작성" : "리뷰어 답변"}</h3>
            <p className="text-xs md:text-sm text-gray-600">
              {currentStep === 1 ? prComments.comments[0].content : "리뷰어의 코멘트에 답변해주세요."}
            </p>
          </WhiteBox>
          {currentStep === 1 ? (
            <div className="relative">
              <textarea
                className="w-full h-32 p-3 border border-gray-300 rounded-lg text-xs md:text-sm bg-white outline-none"
                placeholder="(최소 10자 이상)"
                spellCheck="false"
                value={prHistory ? prHistory.answers[0] : replies[0]}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= MAX_CHAR_LIMIT) {
                    const updatedReplies = [e.target.value, ...replies.slice(1)];
                    setReplies(updatedReplies);
                  }
                }}
                maxLength={MAX_CHAR_LIMIT}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                {getCharCount(prHistory ? prHistory.answers[0] : replies[0])}/{MAX_CHAR_LIMIT}
              </div>
            </div>
          ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                  <p className="text-xs md:text-sm text-gray-700">
                    {prComments.comments[currentStep-1].content}
                  </p>
                </div>
                <div className="relative">
                  <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg text-xs md:text-sm bg-white"
                    placeholder="답변을 작성해주세요 (최소 10자 이상)"
                    value={prHistory ? prHistory.answers[currentStep-1] : replies[currentStep-1]}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= MAX_CHAR_LIMIT) {
                        const updatedReplies = [...replies];
                        updatedReplies[currentStep-1] = e.target.value;
                        setReplies(updatedReplies);
                      }
                    }}
                    maxLength={MAX_CHAR_LIMIT}
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                    {currentReplyLength}/{MAX_CHAR_LIMIT}
                  </div>
                </div>
            </div>
          )}
            {feedbacks[currentStep-1]
              ? <ReviewAssessment feedback={feedbacks[currentStep-1]}/>
              : prHistory
                && <ReviewAssessment feedback={prHistory.feedbacks[currentStep-1]}/>
            }
          <div className="fixed bottom-0 left-0 right-0 p-2 bg-white border border-gray-200 z-10">
            <div className="max-w-xl mx-auto">
              {
                (() => {
                  // 모든 단계가 완료된 경우 버튼을 표시하지 않음
                  if (currentStep === prComments.comments.length && feedbacks[currentStep-1] && !prHistory) {
                    return null; // 아무것도 렌더링하지 않음
                  }
                  
                  // 돌아가기 버튼 조건
                  if (prHistory && currentStep === feedbacks.length) {
                    return (
                      <button
                        className="w-full py-3 bg-purple-600 text-white md:text-lg font-medium rounded-lg hover:bg-purple-700"
                        onClick={() => router.back()}
                      >
                        돌아가기
                      </button>
                    );
                  }
                  
                  // 다음 단계 버튼 조건
                  if (prHistory || feedbacks[currentStep-1]) {
                    return (
                      <button
                        className="w-full py-3 bg-purple-600 text-white rounded-lg md:text-lg font-medium hover:bg-purple-700"
                        onClick={() => setCurrentStep(currentStep + 1)}
                      >
                        다음 단계
                      </button>
                    );
                  }
                  
                  // 검사하기 버튼 (기본)
                  return (
                    <button
                      className={getButtonStyle()}
                      onClick={() => {
                        if (hasText()) {
                          postAnswer({
                            commentId: prComments?.comments[currentStep-1].id,
                            answer: replies[currentStep-1],
                          })
                        }
                      }}
                      disabled={!hasText() || isPostAnswerLoading}
                    >
                      {isPostAnswerLoading ? (<LoadingSpinner size={'xs'}/>) : "검사하기"}
                    </button>
                  );
                })()
              } 
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <ChangedFiles
            prChangedFiles={prChangedFiles}
          />
        </div>
      </div>
    </>
  )
}