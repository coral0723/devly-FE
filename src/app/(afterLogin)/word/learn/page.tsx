import { Suspense } from "react";
import WordLearningContainer from "../_component/WordLearningContainer";
import LoadingSpinner from "@/app/_component/LoadingSpinner";
import WordHydrator from "../_component/WordHydrator";

type Props = {
  searchParams: Promise<{
    studyId: string;
  }>;
};

export default async function WordLearnPage({ searchParams }: Props) {
  const { studyId } = await searchParams;

  return (
    <WordHydrator studyId={studyId}>
      <Suspense fallback={
        <div className="flex justify-center items-center w-full h-screen">
          <LoadingSpinner size={"md"}/>
        </div>
      }>
        <WordLearningContainer isReview={false}/>
      </Suspense>
    </WordHydrator>
  )
}