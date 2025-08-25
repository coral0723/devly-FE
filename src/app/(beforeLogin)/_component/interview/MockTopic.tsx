import MockInterviewCard from "./MockInterviewCard";

export default function MockTopic() {
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
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="max-w-xl mx-auto">
          <h1 className="text-base font-semibold text-gray-900 md:text-lg">모의 면접</h1>
          <p className="text-xs text-gray-500 mt-1 md:text-sm">
            AI 면접관과 함께하는 기술 면접을 연습해보세요
          </p>
        </div>
      </div>

      {/* Content - add top padding to account for header height */}
      <div className="max-w-xl mx-auto p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-gray-900 text-xs md:text-sm">추천 주제</h2>
          <div className="text-orange-600 text-xs md:text-sm">
            매일 새로운 주제가 업데이트됩니다
          </div>
        </div>
        {interviews.map((interview) => (
          <MockInterviewCard key={interview.id} interview={interview}/>
        ))}
      </div>
    </div>
  )
}