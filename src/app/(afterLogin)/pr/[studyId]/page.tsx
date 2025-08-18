import BottomNavigation from "../../_component/BottomNavigation";
import Header from "./_component/Header";
import PrCardsArea from "./_component/PrCardsArea";

type Props = {
  params: Promise<{ 
    studyId: string,
  }>
}

export default async function PRPage({ params }: Props) {
  const { studyId } = await params;
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header/>
      <div className="max-w-xl mx-auto p-4 space-y-4">
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
