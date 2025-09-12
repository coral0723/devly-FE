import { Suspense } from 'react';
import PrLearningContainer from '../_component/PrLearningContainer';
import LoadingSpinner from '@/app/_component/LoadingSpinner';

type Props = {
  params: Promise<{
    studyId: string;
    prId: string;
  }>
}

export default async function PRLearnPage({ params }: Props) {
  const { studyId, prId } = await params;

  return (
    <Suspense fallback={
      <div className="flex justify-center items-center w-full h-screen">
        <LoadingSpinner size={"md"}/>
      </div>
    }>
      <PrLearningContainer 
        studyId={studyId}
        prId={prId}
        isReview={false}
      />
    </Suspense>
  );
};
