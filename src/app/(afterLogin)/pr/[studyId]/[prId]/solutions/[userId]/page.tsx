"use client"

import PrLearningContainer from "../../_component/PrLearningContainer";
import { useParams } from "next/navigation";

export default function PrSolutionPage() {
  const {userId} = useParams();

  return (
    <PrLearningContainer userId={userId as string}/>
  )
}