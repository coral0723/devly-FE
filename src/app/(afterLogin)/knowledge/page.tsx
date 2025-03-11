import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import BackButton from '../_component/BackButton';
import BottomButton from './_component/BottomButton';
import { getKnowledges } from './_lib/getKnowledges'
import { getValidationKnowledgeResult } from './_lib/getValidationKnowledgeResult';
import LearningSection from './_component/LearningSection';
import ReviewSection from './_component/ReviewSection';
import FloatingIcons from './_component/FloatingIcons';

type Props = {
  searchParams: {
    studyId: string;
    knowledgeTotal: string;
  }
}

export default async function KnowledgePage({searchParams}: Props) {
  const {studyId, knowledgeTotal} = await searchParams;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['knowledge', 'learn', studyId], queryFn: getKnowledges});
  await queryClient.prefetchQuery({queryKey: ['knowledge', 'validation', studyId], queryFn: getValidationKnowledgeResult});
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50 relative overflow-hidden">
      <HydrationBoundary state={dehydratedState}>
      <FloatingIcons/>

      {/* Main Content */}
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
      </HydrationBoundary>
    </div>
  );
}
