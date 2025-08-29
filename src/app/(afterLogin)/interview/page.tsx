// import UnderDevelopment from "../_component/UnderDevelopment";
import InterviewCardsArea from "./_component/InterviewCardsArea";
import BottomNavigation from "../_component/BottomNavigation";
import Header from "./_component/Header";
import ContentsWrapper from "@/app/_component/ContentsWrapper";

type Props = {
  searchParams: Promise<{
    studyId: string;
  }>
}

export default async function InterviewPage({ searchParams }: Props) {
  const { studyId } = await searchParams;

  // 미완성 기능일 때 보여주는 컴포넌트
  // const isDevelopment = process.env.NODE_ENV === 'development';

  // if(!isDevelopment) {//배포환경에서는 <UnderDevelopment/> 렌더링
  //   return <UnderDevelopment/>;
  // }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header/>

      <ContentsWrapper
        headerMobileHeight={85}
        headerDesktopHeight={85}
        className="max-w-xl flex flex-col mx-auto"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm md:text-base font-medium text-gray-900">추천 주제</h2>
          <div className="text-sm md:text-base text-orange-600">
            매일 새로운 면접 주제가 업데이트됩니다
          </div>
        </div>
        <InterviewCardsArea studyId={studyId}/>
      </ContentsWrapper>
      <BottomNavigation />
    </div>
  );
};
