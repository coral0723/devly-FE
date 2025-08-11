import { Suspense } from "react";
import LoadingSpinner from "@/app/_component/LoadingSpinner";
import InterviewLearningContainer from "./_component/InterviewLearningContainer";

export default function InterviewLearnPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center w-full h-screen">
        <LoadingSpinner size={"md"}/>
      </div>
    }>
      <InterviewLearningContainer isReview={false}/>
    </Suspense>
  )
}