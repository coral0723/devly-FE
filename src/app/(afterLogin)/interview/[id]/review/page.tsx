import { Suspense } from "react"
import InterviewLearningContainer from "../_component/InterviewLearningContainer"
import LoadingSpinner from "@/app/_component/LoadingSpinner"

export default function InterviewReviewPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center w-full h-screen">
        <LoadingSpinner size={"md"}/>
      </div>
    }>
      <InterviewLearningContainer isReview={true}/>
    </Suspense>
  )
}