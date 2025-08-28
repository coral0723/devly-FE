import ContentsWrapper from "@/app/_component/ContentsWrapper";
import MockInterviewCard from "./MockInterviewCard";

export default function MockInterviewTopic() {
  const interviews = [
    {
      id: 1,
      title: "React Virtual DOM",
      description: "간단한 Virtual DOM과 실제 DOM의 차이점을 설명해보세요.",
    },
    {
      id: 2,
      title: "React Hooks",
      description: "useState와 useEffect의 차이와 사용 시 주의할 점을 설명해보세요.",
    },
    {
      id: 3,
      title: "React Context API",
      description: "Context API를 사용하여 prop drilling을 해결하는 방법을 설명해보세요.",
    }
  ];

  return (
    <div className="flex-grow relative w-full h-full bg-gray-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-white p-4 border-b border-gray-200">
        <div className="max-w-xl mx-auto">
          <h1 className="text-sm font-semibold text-gray-900 md:text-lg">모의 면접</h1>
          <p className="text-[9px] md:text-xs text-gray-500 mt-1">
            AI 면접관과 함께하는 기술 면접을 연습해보세요
          </p>
        </div>
      </div>

      <ContentsWrapper
        headerMobileHeight={70}
        headerDesktopHeight={80}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-gray-900 text-[10px] md:text-base">추천 주제</h2>
          <div className="text-orange-600 text-[10px] md:text-sm">
            매일 새로운 주제가 업데이트됩니다
          </div>
        </div>
        {interviews.map((interview) => (
          <MockInterviewCard key={interview.id} interview={interview}/>
        ))}
      </ContentsWrapper>
    </div>
  )
}