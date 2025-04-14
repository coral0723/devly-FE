import BottomNavigation from "../../_component/BottomNavigation";
import PrCardsArea from "./_component/PrCardsArea";

type Props = {
  params: Promise<{ 
    studyId: string,
  }>
}

export default async function PRPage({ params }: Props) {
  const { studyId } = await params;
  
  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">모의 PR</h1>
        <p className="text-sm text-gray-500 mt-1">
          실제 상황에서 발생할 수 있는 PR을 연습해보세요
        </p>
      </div>

      {/* Recommended PRs */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-gray-900">추천 PR</h2>
          <div className="text-sm text-purple-600">
            매일 새로운 PR이 업데이트됩니다
          </div>
        </div>
        <PrCardsArea studyId={studyId}/>
      </div>
      <BottomNavigation />
    </div>
  );
};
