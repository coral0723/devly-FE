"use client"

import { PrCard as IPRCard } from "@/model/pr/PrCard";
import { useQuery } from "@tanstack/react-query";
import { getPrCards } from "../_lib/getPrCards";
import PrCard from "./PrCard";
import LoadingSpinner from "@/app/_component/LoadingSpinner";

type Props = {
  studyId: string;
}

export default function PrCardsArea({ studyId }: Props) {

  const {data: prCards, isLoading} = useQuery<IPRCard, object, IPRCard, [_1: string, _2: string, string]>({
    queryKey: ['pr', 'cards', studyId],
    queryFn: getPrCards,
    staleTime: 0,
    refetchOnMount: 'always',
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
      {/* 추후 PR 데이터가 배열로 변경되면 아래 코드를 map으로 변경할 예정 */}
      <PrCard pr={prCards}/>
    </>
  )
}