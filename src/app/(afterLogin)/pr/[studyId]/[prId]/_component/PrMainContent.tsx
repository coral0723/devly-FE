"use client"

import { PrComments } from "@/model/pr/PrComments"
import ReviewAssessment from "./ReviewAssessment";
import { Feedback } from "@/model/pr/Feedback";
import LoadingSpinner from "@/app/_component/LoadingSpinner";
import { useRouter } from "next/navigation";
import ChangedFiles from "./ChangedFiles";
import { PrChangedFiles } from "@/model/pr/PrChangedFiles";
import Comment from "../_component/Comment";
import DOMPurify from "dompurify";

type Props = {
  currentStep: number,
  prComments: PrComments,
  replies: string[],
  feedbacks: Feedback[],
  isPostAnswerLoading: boolean,
  prChangedFiles: PrChangedFiles,
  setReplies: (replies: string[]) => void,
  setCurrentStep: (step: number) => void,
  postAnswer: (params: {commentId: number, answer: string}) => void
}

export default function PrMainContent({ currentStep, prComments, replies, feedbacks, isPostAnswerLoading, prChangedFiles, setReplies, setCurrentStep, postAnswer }: Props) {
  const router = useRouter();
  const MAX_CHAR_LIMIT = 500;

  const getCharCount = (text: string) => {
    return text ? text.length : 0;
  };
  
  const currentReplyLength = getCharCount(replies[currentStep - 1] || '');
  
  // 현재 텍스트가 있는지 확인하는 함수
  const hasText = () => {
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
        <div className="space-y-4 mx-auto max-w-5xl lg:max-w-none lg:mx-0">
          <Comment
            currentStep={currentStep}
            prComments={prComments}
          />
          {currentStep === 1 ? (
            <div className="relative">
              <textarea
                className="w-full h-40 p-3 border border-gray-300 rounded-lg text-xs md:text-sm bg-white outline-none resize-none"
                placeholder="(최소 10자 이상)"
                spellCheck="false"
                value={replies[0]}
                onChange={(e) => {
                  const value = DOMPurify.sanitize(e.target.value); // XSS 방어
                  if (value.length <= MAX_CHAR_LIMIT) {
                    const updatedReplies = [e.target.value, ...replies.slice(1)];
                    setReplies(updatedReplies);
                  }
                }}
                maxLength={MAX_CHAR_LIMIT}
              />
              <div className="absolute bottom-2 right-4 text-xs text-gray-500">
                {getCharCount(replies[0])}/{MAX_CHAR_LIMIT}
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
                    value={replies[currentStep-1]}
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
            {feedbacks[currentStep-1] && <ReviewAssessment feedback={feedbacks[currentStep-1]}/>}
          <div className="fixed bottom-0 left-0 right-0 p-2 bg-white border border-gray-200 z-10">
            <div className="max-w-xl mx-auto">
              {
                (() => {
                  // 모든 단계가 완료된 경우 버튼을 표시하지 않음
                  if (currentStep === prComments.comments.length && feedbacks[currentStep-1]) {
                    return null; // 아무것도 렌더링하지 않음
                  }
                  
                  // 다음 단계 버튼 조건
                  if (feedbacks[currentStep-1]) {
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