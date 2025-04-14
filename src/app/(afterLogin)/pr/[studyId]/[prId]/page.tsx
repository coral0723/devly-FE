import { Suspense } from 'react';
import PrLearningContainer from './_component/PrLearningContainer';
import LoadingSpinner from '@/app/_component/LoadingSpinner';

export default async function PRLearnPage() {

  return (
    <Suspense fallback={
      <div className="flex justify-center items-center w-full h-screen">
        <LoadingSpinner size={"md"}/>
      </div>
    }>
      <PrLearningContainer isReview={false}/>
    </Suspense>
  );
};
