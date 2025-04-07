"use client"

import { PrComments } from "@/model/pr/PrComments"
import { PrHistory } from "@/model/pr/prHistory"
import ReviewAssessment from "./ReviewAssessment";
import { Feedback } from "@/model/pr/Feedback";
import LoadingSpinner from "@/app/_component/LoadingSpinner";
import { useRouter } from "next/navigation";

type Props = {
  currentStep: number,
  prComments: PrComments,
  prHistory?: PrHistory,
  replies: string[],
  feedbacks: Feedback[],
  isPostAnswerLoading: boolean,
  setReplies: (replies: string[]) => void,
  setCurrentStep: (step: number) => void,
  postAnswer: (params: {commentId: number, answer: string}) => void
}

export default function PrMainContent({ currentStep, prComments, prHistory, replies, feedbacks, isPostAnswerLoading, setReplies, setCurrentStep, postAnswer }: Props) {
  const router = useRouter();
  
  return (
      <div className="p-4 overflow-y-auto scrollbar-hide" style={{ height: 'calc(100vh - 200px)' }}>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium mb-2">{currentStep === 1 ? "PR 설명 작성" : "리뷰어 답변"}</h3>
            <p className="text-sm text-gray-600">
              {currentStep === 1 ? prComments.comments[0].content : "리뷰어의 코멘트에 답변해주세요."}
            </p>
          </div>
          {currentStep === 1 ? (
            <textarea
              className="w-full h-32 p-3 border border-gray-300 rounded-lg text-sm bg-white"
              placeholder="PR 설명을 작성해주세요..."
              value={prHistory ? prHistory.answers[0] : replies[0]}
              onChange={(e) => {
                const updatedReplies = [e.target.value, ...replies.slice(1)];
                setReplies(updatedReplies);
              }}
            />
          ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="bg-gray-50 p-3 rounded-lg mb-3">
                <p className="text-sm text-gray-700">
                  {prComments.comments[currentStep-1].content}
                </p>
              </div>
              <textarea
                className="w-full h-32 p-3 border border-gray-300 rounded-lg text-sm bg-white"
                placeholder="답변을 작성해주세요..."
                value={prHistory ? prHistory.answers[currentStep-1] : replies[currentStep-1]}
                onChange={(e) => {
                  const updatedReplies = [...replies];
                  updatedReplies[currentStep-1] = e.target.value;
                  setReplies(updatedReplies);
                }}
              />
            </div>
          )}
            {feedbacks[currentStep-1]
              ? <ReviewAssessment feedback={feedbacks[currentStep-1]}/>
              : prHistory
                && <ReviewAssessment feedback={prHistory.feedbacks[currentStep-1]}/>
            }
          <div className="fixed w-full max-w-lg bottom-0 left-1/2 transform -translate-x-1/2 p-2 bg-white border border-gray-200 z-10">
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
                      className="w-full py-3 bg-purple-600 text-white text-lg font-medium rounded-lg hover:bg-purple-700"
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
                      className="w-full py-3 bg-purple-600 text-white rounded-lg text-lg font-medium hover:bg-purple-700"
                      onClick={() => setCurrentStep(currentStep + 1)}
                    >
                      다음 단계
                    </button>
                  );
                }
                
                // 검사하기 버튼 (기본)
                return (
                  <button
                    className="w-full py-3 bg-purple-600 text-white rounded-lg text-lg font-medium hover:bg-purple-700"
                    onClick={() => postAnswer({
                      commentId: prComments?.comments[currentStep-1].id,
                      answer: replies[currentStep-1],
                    })}
                  >
                    {isPostAnswerLoading ? (<LoadingSpinner size={'xs'}/>) : "검사하기"}
                  </button>
                );
              })()
            } 
          </div>
        </div>
      </div>
  )
}