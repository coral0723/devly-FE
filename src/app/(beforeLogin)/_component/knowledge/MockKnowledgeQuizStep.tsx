import ContentsWrapper from "@/app/_component/ContentsWrapper";
import WhiteBox from "../../../_component/WhiteBox";
import Header from "./Header";
import NavigationTabs from "./NavigationTabs";

export default function MockKnowledgeQuizStep() {
  const distractors = [
    {
      id: 1,
      distractor: "프로세스의 메모리를 공유한다",
    },
    {
      id: 2,
      distractor: "각 스레드는 독립적인 메모리 공간을 가진다",
    },
    {
      id: 3,
      distractor: "동시에 여러 작업을 수행할 수 있다",
    },
    {
      id: 4,
      distractor: "스택 영역은 스레드마다 독립적이다",
    },
  ];

  return (
    <div className="flex-grow overflow-hidden relative w-full h-full bg-gray-50">
      <Header
        currentStep={1}
        endStep={3}
      />

      {/* Content */}
      <ContentsWrapper 
        headerMobileHeight={60}
        headerDesktopHeight={68}
      >
        <WhiteBox>
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-sm md:text-lg font-bold flex-1">스레드의 기본 개념</h1>
          </div>

          <NavigationTabs
            currentTab="문제"
          />

          <div className="space-y-2 md:space-y-4">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 md:p-4 mt-4">
              <h2 className="text-xs md:text-base font-semibold text-blue-800 mb-2">문제</h2>
              <p className="text-blue-900 text-[9px] md:text-sm">다음 중 스레드의 특징이 아닌 것은?</p>
            </div>
            {distractors.map((distractor, idx) => (
              <button
                key={distractor.id}
                className={`w-full flex items-center gap-4 p-3 md:p-4 text-left border rounded-lg transition-all`}
                disabled={true}
              >
                <div className={`w-5 h-5 md:w-7 md:h-7 flex items-center justify-center rounded-full border-2 flex-shrink-0`}>
                  <span className="text-gray-500 text-xs md:text-base">{idx + 1}</span>
                </div>
                <span className="text-xs md:text-base">{distractor.distractor}</span>
              </button>
            ))}
          </div>
        </WhiteBox>
      </ContentsWrapper>

      <div className="absolute bottom-0 left-0 right-0 bg-white p-2 border border-gray-200 z-10">
        <div className="max-w-xl mx-auto">
          <button
            className={`w-full py-1 md:py-2 text-white rounded-xl text-xs md:text-lg font-medium transition-all bg-gray-300 cursor-not-allowed`}
            disabled={true}
          >
            다음 문제
          </button>
        </div>
      </div>
    </div>
  )
}