"use client"

import { PrCard as IPRCard } from "@/model/PrCard";
import { useQuery } from "@tanstack/react-query";
import { getPrCards } from "../_lib/getPrCards";
import PrCard from "./PrCard";
import LoadingSpinner from "@/app/_component/LoadingSpinner";

type Props = {
  studyId: string;
}

export default function PrCardsArea({studyId}: Props) {

  const {data: prCards, isLoading} = useQuery<IPRCard[], object, IPRCard[], [_1: string, _2: string, string]>({
    queryKey: ['pr', 'cards', studyId],
    queryFn: getPrCards,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000
  });

  if(isLoading || !prCards) {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner size={"sm"}/>
      </div>
    )
  }

  return (
    <>
      {prCards.map((pr) => (
        <PrCard key={pr.id} pr={pr}/>
      ))}
    </>
  )
}