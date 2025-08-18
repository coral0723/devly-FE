// import UnderDevelopment from "../_component/UnderDevelopment";
import InterviewCardsArea from "./_component/InterviewCardsArea";
import BottomNavigation from "../_component/BottomNavigation";
import Header from "./_component/Header";

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
      <div className="max-w-xl mx-auto p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-gray-900">추천 주제</h2>
          <div className="text-sm text-orange-600">
            매일 새로운 면접 주제가 업데이트됩니다
          </div>
        </div>
        <InterviewCardsArea studyId={studyId}/>
      </div>
      <BottomNavigation />
    </div>
  );
};
