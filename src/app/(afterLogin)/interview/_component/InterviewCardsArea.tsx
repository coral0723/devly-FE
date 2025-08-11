"use client"

import { InterviewCard as IInterviewCard } from "@/model/interview/InterviewCard";
import { useQuery } from "@tanstack/react-query";
import { getInterviewCards } from "../_lib/getInterviewCards";
import InterviewCard from "./InterviewCard";
import LoadingSpinner from "@/app/_component/LoadingSpinner";

type Props = {
  studyId: string;
}

export default function InterviewCardsArea({ studyId }: Props) {

  const {data: interviewCards, isLoading} = useQuery<IInterviewCard[], object, IInterviewCard[], [_1: string, _2: string, string]>({
    queryKey: ['interview', 'cards', studyId],
    queryFn: getInterviewCards,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000
  });

  if(isLoading || !interviewCards) {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner size={"sm"}/>
      </div>
    )
  }

  return (
    <>
      {interviewCards.map((interview) => (
        <InterviewCard key={interview.id} interview={interview}/>
      ))}
    </>
  )
}