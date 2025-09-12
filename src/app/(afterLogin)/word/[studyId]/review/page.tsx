import { Suspense } from "react"
import WordLearningContainer from "../_component/WordLearningContainer"
import LoadingSpinner from "@/app/_component/LoadingSpinner"

export default function WordReviewPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center w-full h-screen">
        <LoadingSpinner size={"md"}/>
      </div>
    }>
      <WordLearningContainer isReview={true}/>
    </Suspense>
  )
}