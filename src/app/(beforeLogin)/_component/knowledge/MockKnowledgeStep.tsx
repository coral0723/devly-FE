import ContentsWrapper from "../ContentsWrapper";
import WhiteBox from "../WhiteBox";
import Header from "./Header";
import NavigationTabs from "./NavigationTabs";

export default function MockKnowledgeStep() {
  return (
    <div className="flex-grow relative w-full h-full bg-gray-50">
      <Header
        currentStep={1}
        endStep={3}
      />

      <ContentsWrapper
        headerMobileHeight={60}
        headerDesktopHeight={68}
      >
        <WhiteBox>
          <div className="flex items-center gap-4 mb-2 md:mb-4">
            <h1 className="text-sm md:text-lg font-bold flex-1">스레드의 기본 개념</h1>
          </div>

          <NavigationTabs
            currentTab="개념"
          />

          <div className="mt-4">
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed text-[9px] md:text-sm">
                스레드는 프로세스 내에서 실행되는 가장 작은 실행 단위입니다.<br/>
                하나의 프로세스는 여러 개의 스레드를 가질 수 있으며,<br/> 
                각 스레드는 같은 프로세스의 메모리를 공유합니다.<br/>
              </p>
            </div>
          </div>
        </WhiteBox>
      </ContentsWrapper>
    </div>
  )
}