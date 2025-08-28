import ContentsWrapper from "@/app/_component/ContentsWrapper";
import MockPrCard from "./MockPrCard";

export default function MockPrTopic() {
  const prs = [
    {
      id: 1,
      title: "Refactor login flow to improve readability and error handling",
      description: `로그인 흐름을 리팩터링하여 가독성과 오류 처리를 개선`,
      labels: [
        "refactor",
        "login",
        "frontend"
      ]
    },
    {
      id: 2,
      title: "Optimize image loading for better performance",
      description: `이미지 로딩 방식을 최적화하여 페이지 성능을 향상`,
      labels: [
        "performance",
        "image",
        "frontend"
      ]
    },
    {
      id: 3,
      title: "Add unit tests for user authentication module",
      description: `사용자 인증 모듈에 대한 단위 테스트를 추가`,
      labels: [
        "test",
        "authentication",
        "backend"
      ]
    }
  ];

  return (
    <div className="flex-grow relative w-full h-full bg-gray-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white p-4 border-b border-gray-200">
        <div className="max-w-xl mx-auto">
          <h1 className="text-sm font-semibold text-gray-900 md:text-lg">모의 PR</h1>
          <p className="text-[9px] md:text-xs text-gray-500 mt-1">
            실제 상황에서 발생할 수 있는 PR을 연습해보세요
          </p>
        </div>
      </div>

      <ContentsWrapper
        headerMobileHeight={70}
        headerDesktopHeight={80}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-gray-900 text-[10px] md:text-base">추천 PR</h2>
          <div className="text-[10px] text-purple-600 md:text-sm">
            매일 새로운 PR이 업데이트됩니다
          </div>
        </div>
        {prs.map((pr) => (
          <MockPrCard key={pr.id} pr={pr}/>
        ))}
      </ContentsWrapper>
    </div>
  )
}