"use client"

import Header from "./_component/Header";
import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Solution } from "@/model/pr/solutions/Solution";
import { useParams } from "next/navigation";
import { getSolutions } from "./_lib/getSolutions";
import SolutionsContainer from "./_component/SolutionsContainer";

export default function PrSolutionsPage() {
  const { prId } = useParams();

  const {
    data,
    fetchNextPage,
    hasNextPage
  } = useSuspenseInfiniteQuery<Solution[], object, InfiniteData<Solution[]>, [_1: string, _2: string, string], number>({
    queryKey: ["pr", "solutions", prId as string],
    queryFn: getSolutions,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length;
    },
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const solutions = data?.pages.flat() || [];

  return (
    <div className="max-w-lg mx-auto h-screen bg-gray-100 flex flex-col overflow-hidden">
      <Header/>
      <SolutionsContainer
        solutions={solutions}
        hasNextPage={hasNextPage}
        onLoadMore={() => {
          fetchNextPage();
          return Promise.resolve();
        }}
      />
    </div>
  );
}