import { Suspense } from "react"
import KnowledgeLearningContainer from "../_component/KnowledgeLearningContainer"
import LoadingSpinner from "@/app/_component/LoadingSpinner"

type Props = {
  params: Promise<{
    studyId: string;
  }>;
}

export default async function KnowledgeReviewage({ params }: Props) {
  const { studyId } = await params;

  return (
    <Suspense fallback={
      <div className="flex justify-center items-center w-full h-screen">
        <LoadingSpinner size={"md"}/>
      </div>
    }>
      <KnowledgeLearningContainer studyId={studyId} isReview={true}/>
    </Suspense>
  )
}