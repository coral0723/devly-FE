"use client"

import { DiscussionCard as IDiscussionCard } from "@/model/discussion/DiscussionCard";
import { useQuery } from "@tanstack/react-query";
import { getDiscussionCards } from "../_lib/getDiscussionCards";
import DisscussionCard from "./DiscussionCard";
import LoadingSpinner from "@/app/_component/LoadingSpinner";

type Props = {
  studyId: string;
}

export default function DiscussionCardsArea({ studyId }: Props) {

  const {data: discussionCards, isLoading} = useQuery<IDiscussionCard[], object, IDiscussionCard[], [_1: string, _2: string, string]>({
    queryKey: ['discussion', 'cards', studyId],
    queryFn: getDiscussionCards,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000
  });

  if(isLoading || !discussionCards) {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner size={"sm"}/>
      </div>
    )
  }

  return (
    <>
      {discussionCards.map((discussion) => (
        <DisscussionCard key={discussion.id} discussion={discussion}/>
      ))}
    </>
  )
}