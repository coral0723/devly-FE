import { Suspense } from "react"
import InterviewLearningContainer from "../_component/InterviewLearningContainer"
import LoadingSpinner from "@/app/_component/LoadingSpinner"

type Props = {
  params: Promise<{
    interviewId: string;
  }>;
}

export default async function InterviewReviewPage({ params }: Props) {
  const { interviewId } = await params;

  return (
    <Suspense fallback={
      <div className="flex justify-center items-center w-full h-screen">
        <LoadingSpinner size={"md"}/>
      </div>
    }>
      <InterviewLearningContainer
        interviewId={interviewId}
        isReview={true}
      />
    </Suspense>
  )
}