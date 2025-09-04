import FloatingIcons from './_component/FloatingIcons';
import BottomButton from './_component/BottomButton';
import BackButton from '../_component/BackButton';
import LearningSection from './_component/LearningSection';
import ReviewSection from './_component/ReviewSection';
import WordHydrator from './_component/WordHydrator';

type Props = {
  searchParams: Promise<{
    studyId: string;
    wordTotal: string;
  }>
}

export default async function WordPage({ searchParams }: Props) {
  const { studyId, wordTotal } = await searchParams;

  return (
    <WordHydrator studyId={studyId}>
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
    </WordHydrator>
  )
}