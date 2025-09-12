import { Suspense } from "react"
import WordLearningContainer from "../_component/WordLearningContainer"
import LoadingSpinner from "@/app/_component/LoadingSpinner"

type Props = {
  params: Promise<{
    studyId: string;
  }>;
}

export default async function WordReviewPage({ params }: Props) {
  const { studyId } = await params;

  return (
    <Suspense fallback={
      <div className="flex justify-center items-center w-full h-screen">
        <LoadingSpinner size={"md"}/>
      </div>
    }>
      <WordLearningContainer studyId={studyId} isReview={true}/>
    </Suspense>
  )
}