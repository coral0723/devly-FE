import FloatingIcons from './_component/FloatingIcons';
import BottomButton from './_component/BottomButton';
import BackButton from '../_component/BackButton';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getWords } from './_lib/getWords';
import { getValidationWordsResult } from './_lib/getValidationWordsResult';
import LearningSection from './_component/LearningSection';
import ReviewSection from './_component/ReviewSection';

type Props = {
  searchParams: {
    studyId: string;
    wordTotal: string;
  }
}

export default async function WordPage({searchParams}: Props) {
  const {studyId, wordTotal} = await searchParams;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['word', 'learn', studyId], queryFn: getWords});
  await queryClient.prefetchQuery({queryKey: ['word', 'validation', studyId], queryFn: getValidationWordsResult});
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50 relative overflow-hidden">
      <HydrationBoundary state={dehydratedState}>
      <FloatingIcons/>

      {/* Main Content */}
      <div className="relative z-10 px-6 pb-24">
        <BackButton/>
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
      </HydrationBoundary>
    </div>
  )
}