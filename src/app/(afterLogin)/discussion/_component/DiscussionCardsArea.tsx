"use client"

import { DiscussionCard as IDiscussionCard } from "@/model/DiscussionCard";
import { useQuery } from "@tanstack/react-query";
import { getDiscussionCards } from "../_lib/getDiscussionCards";
import DisscussionCard from "./DiscussionCard";
import LoadingSpinner from "@/app/_component/LoadingSpinner";

type Props = {
  groupId: string;
}

export default function DiscussionCardsArea({groupId}: Props) {

  const {data: discussionCards, isLoading} = useQuery<IDiscussionCard[], object, IDiscussionCard[], [_1: string, _2: string, string]>({
    queryKey: ['discussion', 'cards', groupId],
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
      {discussionCards.map((pr) => (
        <DisscussionCard key={pr.id} pr={pr}/>
      ))}
    </>
  )
}