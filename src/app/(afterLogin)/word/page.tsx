import FloatingIcons from './_component/FloatingIcons';
import BottomButton from './_component/BottomButton';
import BackButton from '../_component/BackButton';
import LearningSection from './_component/LearningSection';
import ReviewSection from './_component/ReviewSection';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getWords } from './_lib/getWords';
import { getValidationWordResult } from './_lib/getValidationWordResult';

type Props = {
  searchParams: Promise<{
    studyId: string;
    wordTotal: string;
  }>
}

export default async function WordPage({ searchParams }: Props) {
  const { studyId, wordTotal } = await searchParams;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ["word", "learn", studyId], queryFn: getWords});
  await queryClient.prefetchQuery({queryKey: ["word", "validation", studyId], queryFn: getValidationWordResult});
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <HydrationBoundary state={dehydratedState}>
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
      </HydrationBoundary>
    </div>
  )
}