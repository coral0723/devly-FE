import { Suspense } from "react"
import KnowledgeLearningContainer from "../_component/KnowledgeLearningContainer"
import LoadingSpinner from "@/app/_component/LoadingSpinner"

export default function KnowledgeReviewage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center w-full h-screen">
        <LoadingSpinner size={"md"}/>
      </div>
    }>
      <KnowledgeLearningContainer isReview={true}/>
    </Suspense>
  )
}