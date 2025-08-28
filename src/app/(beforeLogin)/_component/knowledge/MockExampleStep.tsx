import { Code } from "lucide-react";
import Header from "./Header";
import ContentsWrapper from "@/app/_component/ContentsWrapper";
import WhiteBox from "../../../_component/WhiteBox";
import NavigationTabs from "./NavigationTabs";

export default function MockExampleStep() {
  const code = "// Java에서 스레드 생성 예시\n\nclass MyThread extends Thread {\npublic void run() {\n    System.out.println(\"스레드 실행 중\");\n}\n}\n\npublic class Main {\npublic static void main(String[] args) {\n    MyThread thread = new MyThread();\n    thread.start(); // 새로운 스레드 시작\n}\n}";

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
            currentTab="코드"
          />

          <div className="space-y-4 mt-4">
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] md:text-sm text-gray-400">예시 코드</span>
                <div className="flex items-center space-x-2">
                  <Code className="text-gray-400 w-3 h-3 md:w-4 md:h-4" />
                </div>
              </div>
              <pre className="overflow-x-hidden text-[9px] md:text-xs">
                <code>{code}</code>
              </pre>
            </div>
          </div>
        </WhiteBox>
      </ContentsWrapper>
    </div>
  )
}