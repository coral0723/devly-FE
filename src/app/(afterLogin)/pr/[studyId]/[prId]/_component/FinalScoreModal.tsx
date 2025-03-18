"use client";

import { FinalFeedback } from "@/model/pr/FinalFeedback";
import { useRouter } from "next/navigation";

type Props = {
  isReview: boolean;
  finalFeedback: FinalFeedback;
}


export default function FinalScoreModal({isReview, finalFeedback}: Props) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50">
      <div className="h-[calc(100vh-4rem)] mt-8 flex flex-col bg-gray-50 max-w-3xl mx-auto rounded-lg overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold text-lg text-gray-800">최종 평가</h3>
        </div>

        {/* Final Score Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="p-4">
            <div className="text-center pt-8 bg-white">
              <div className="text-2xl font-bold mb-6">
                {isReview ? "복습을 완료했습니다!" : "학습을 완료했습니다! 🎉"}
              </div>
              <div className="space-y-6 mb-8">
                <div>
                  <div className="text-sm text-gray-600 mb-1">전체 점수</div>
                  <div className="text-3xl font-bold text-purple-700 mb-4">{finalFeedback.score}/100</div>
                </div>
                <div className="text-left p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-3">{isReview ? "복습 분석" : "학습 분석"}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-blue-800">강점</h4>
                      <ul className="list-disc pl-4 mt-2 space-y-1 text-gray-600">
                        {finalFeedback.strengths.map((strength) => (
                          <li key={strength}>{strength}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-blue-800">개선이 필요한 부분</h4>
                      <ul className="list-disc pl-4 mt-2 space-y-1 text-gray-600">
                        {finalFeedback.improvements.map((improvement) => (
                          <li key={improvement}>{improvement}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-blue-800">추천 학습 자료</h4>
                      <ul className="list-disc pl-4 mt-2 space-y-1 text-gray-600">
                        {finalFeedback.recommendedResources.map((recommendedResource) => (
                          <li key={recommendedResource}>{recommendedResource}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 

        {/* Bottom Button */}
        <div className="p-4 bg-white border-t border-gray-200">
          <button
            onClick={() => {
              router.replace(isReview ? '/review' : '/home');
            }}
            className="w-full py-3 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 rounded-lg text-white text-lg font-medium"
          >
            {isReview ? "복습 끝내기" : "학습 끝내기"}
          </button>
        </div>
        
      </div>
    </div>
  );
}
