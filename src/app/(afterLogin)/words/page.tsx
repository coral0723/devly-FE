import FloatingIcons from './_component/FloatingIcons';
import BottomButton from './_component/BottomButton';
import BackButton from '../_component/BackButton';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getWords } from './_lib/getWords';
import { getValidationResult } from './_lib/getValidationResult';
import LearningSection from './_component/LearningSection';
import ReviewSection from './_component/ReviewSection';

type Props = {
  searchParams: {
    studyId: string;
    wordTotal: string;
  }
}

export default async function WordsPage({searchParams}: Props) {
  const {studyId, wordTotal} = await searchParams;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['words', 'learn', studyId], queryFn: getWords});
  await queryClient.prefetchQuery({queryKey: ['words', 'validation', studyId], queryFn: getValidationResult});
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50 relative overflow-hidden">
      <HydrationBoundary state={dehydratedState}>
      <FloatingIcons/>

      {/* Main Content */}
      <div className="relative z-10 px-6 pb-24">
        <BackButton/>
        {wordTotal === "5" ? 
          <LearningSection/> :
          <ReviewSection 
            wordTotal={wordTotal}
          />}
      </div>
      <BottomButton
        studyId={studyId}
        wordTotal={wordTotal}
      />
      </HydrationBoundary>
    </div>
  )
}