// import UnderDevelopment from '../_component/UnderDevelopment';
import BackButton from '../../_component/BackButton';
import BottomButton from './_component/BottomButton';
import LearningSection from './_component/LearningSection';
import ReviewSection from './_component/ReviewSection';
import FloatingIcons from './_component/FloatingIcons';

type Props = {
  params: Promise<{
    studyId: string;
  }>;
  searchParams: Promise<{
    knowledgeTotal: string;
  }>;
}

export default async function KnowledgePage({ params, searchParams }: Props) {
  const { studyId } = await params;
  const { knowledgeTotal } = await searchParams;

  // 미완성 기능일 때 보여주는 컴포넌트
  // const isDevelopment = process.env.NODE_ENV === 'development';

  // if(!isDevelopment) { //배포환경에서는 <UnderDevelopment/> 렌더링
  //   return <UnderDevelopment/>;
  // }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <BackButton/>
      {/* Main Content */}
      <div className="max-w-xl mx-auto relative">
        <div className="z-10 pb-24 px-2 md:px-4">
          <FloatingIcons/>
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
    </div>
  );
}
