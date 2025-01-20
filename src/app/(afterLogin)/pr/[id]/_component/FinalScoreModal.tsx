"use client";

import { useRouter } from "next/navigation";


export default function FinalScoreModal() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50">
      <div className="h-[calc(100vh-4rem)] mt-8 flex flex-col bg-gray-50 max-w-3xl mx-auto rounded-lg overflow-hidden">
        <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold text-lg text-gray-800">최종 평가</h3>
        </div>
        <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
          
          {/* Final Score Area */}
          <div className="text-center pt-8 bg-white">
            <div className="text-2xl font-bold text-green-600 mb-6">
              🎉 학습을 완료했습니다!
            </div>
            <div className="space-y-6 mb-8">
              <div>
                <div className="text-sm text-gray-600 mb-1">전체 점수</div>
                <div className="text-3xl font-bold text-blue-600 mb-4">85/100</div>
              </div>

              <div className="text-left p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-3">학습 분석</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-blue-800">강점</h4>
                    <ul className="list-disc pl-4 mt-2 space-y-1 text-gray-600">
                      <li>기술적 용어의 적절한 사용</li>
                      <li>명확한 문장 구조로 의도 전달이 잘 됨</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-800">개선이 필요한 부분</h4>
                    <ul className="list-disc pl-4 mt-2 space-y-1 text-gray-600">
                      <li>
                        <span className="font-medium">시제 활용:</span>
                        <br />
                        <span className="text-gray-500">
                          현재완료(have/has + p.p.)와 단순과거 시제의 구분이 필요해요. 특히 구현 결과를 설명할 때는 현재완료를 사용하면 좋습니다.
                        </span>
                      </li>
                      <li>
                        <span className="font-medium">디자인 패턴 이해:</span>
                        <br />
                        <span className="text-gray-500">
                          Singleton Pattern의 장단점과 적용 시나리오에 대한 더 깊은 이해가 도움될 것 같아요. 특히 Thread Safety와 관련된 부분을 추가로 학습해보세요.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-800">추천 학습 자료</h4>
                    <ul className="list-disc pl-4 mt-2 space-y-1 text-gray-600">
                      <li>Java의 시제와 관사 사용법 가이드</li>
                      <li>Effective Java - Chapter 2: Singleton Pattern</li>
                      <li>Thread Safety in Java - Best Practices</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                router.push("/home");
              }}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              학습 끝내기
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
