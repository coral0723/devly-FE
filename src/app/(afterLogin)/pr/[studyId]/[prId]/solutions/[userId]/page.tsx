"use client"

import PrLearningContainer from "../../_component/PrLearningContainer";
import { useParams } from "next/navigation";

export default function PrSolutionPage() {
  const { studyId, prId, userId } = useParams();

  return (
    <PrLearningContainer 
      studyId={studyId as string}
      prId={prId as string}
      userId={userId as string}
      isReview={false}
    />
  )
}