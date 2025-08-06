// import UnderDevelopment from "../_component/UnderDevelopment";
import DiscussionCardsArea from "./_component/DiscussionCardsArea";
import BottomNavigation from "../_component/BottomNavigation";

type Props = {
  searchParams: Promise<{
    studyId: string;
  }>
}

export default async function DiscussionPage({ searchParams }: Props) {
  const { studyId } = await searchParams;

  // 미완성 기능일 때 보여주는 컴포넌트
  // const isDevelopment = process.env.NODE_ENV === 'development';

  // if(!isDevelopment) {//배포환경에서는 <UnderDevelopment/> 렌더링
  //   return <UnderDevelopment/>;
  // }
  
  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">모의 면접</h1>
        <p className="text-sm text-gray-500 mt-1">
          AI 면접관과 함께하는 기술 면접을 연습해보세요
        </p>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-gray-900">추천 주제</h2>
          <div className="text-sm text-orange-600">
            매일 새로운 면접 주제가 업데이트됩니다
          </div>
        </div>
        <DiscussionCardsArea studyId={studyId}/>
      </div>
      <BottomNavigation />
    </div>
  );
};
