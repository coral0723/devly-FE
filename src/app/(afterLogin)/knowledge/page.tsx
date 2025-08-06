import UnderDevelopment from '../_component/UnderDevelopment';
import BackButton from '../_component/BackButton';
import BottomButton from './_component/BottomButton';
import LearningSection from './_component/LearningSection';
import ReviewSection from './_component/ReviewSection';
import FloatingIcons from './_component/FloatingIcons';

type Props = {
  searchParams: Promise<{
    studyId: string;
    knowledgeTotal: string;
  }>
}

export default async function KnowledgePage({ searchParams }: Props) {
  const { studyId, knowledgeTotal } = await searchParams;

  // 미완성 기능일 때 보여주는 컴포넌트
  // const isDevelopment = process.env.NODE_ENV === 'development';

  // if(!isDevelopment) { //배포환경에서는 <UnderDevelopment/> 렌더링
  //   return <UnderDevelopment/>;
  // }

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50 relative overflow-hidden">
      <FloatingIcons/>
      <div className="relative z-10 px-6 pb-24">
        <BackButton/>
        {knowledgeTotal === "3" 
          ? <LearningSection/>
          : <ReviewSection
              KnowledgeTotal={knowledgeTotal}
            />
        }
      </div>
      <BottomButton 
        studyId={studyId}
        knowledgeTotal={knowledgeTotal}
      />
    </div>
  );
}
