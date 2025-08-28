import ContentsWrapper from "@/app/_component/ContentsWrapper";
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

      <ContentsWrapper
        headerMobileHeight={85}
        headerDesktopHeight={85}
        className="max-w-xl flex flex-col mx-auto"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm md:text-base font-medium text-gray-900">추천 PR</h2>
          <div className="text-sm md:text-base text-purple-600">
            매일 새로운 PR이 업데이트됩니다
          </div>
        </div>
        <PrCardsArea studyId={studyId}/>
      </ContentsWrapper>
      <BottomNavigation />
    </div>
  );
};
