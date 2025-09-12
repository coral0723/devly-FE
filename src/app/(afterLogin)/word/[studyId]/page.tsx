import FloatingIcons from './_component/FloatingIcons';
import BottomButton from './_component/BottomButton';
import BackButton from '../../_component/BackButton';
import LearningSection from './_component/LearningSection';
import ReviewSection from './_component/ReviewSection';

type Props = {
  params: Promise<{
    studyId: string;
  }>;
  searchParams: Promise<{
    wordTotal: string;
  }>;
}

export default async function WordPage({ params, searchParams }: Props) {
  const { studyId } = await params;
  const { wordTotal } = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <BackButton/>
      {/* Main Content */}
      <div className="max-w-xl mx-auto relative">
        <FloatingIcons/>
        <div className="z-10 pb-24 px-2 md:px-4">
            {wordTotal === "5" 
              ? <LearningSection/> 
              : <ReviewSection 
                wordTotal={wordTotal}
              />
            }
        </div>
        <BottomButton
          studyId={studyId}
          wordTotal={wordTotal}
          />
      </div>
    </div>
  )
}