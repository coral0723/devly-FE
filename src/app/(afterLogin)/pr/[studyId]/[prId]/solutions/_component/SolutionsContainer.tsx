"use client"

import { Solution as ISolution } from "@/model/pr/solutions/Solution";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Solution from "./Solution";

type Props = {
  solutions: ISolution[],
  hasNextPage: boolean | undefined,
  onLoadMore: () => Promise<void>,
}

export default function SolutionsContainer({ solutions, hasNextPage, onLoadMore }: Props) {
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      onLoadMore();
    }
  }, [inView, hasNextPage, onLoadMore]);
  
  return (
    <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
      {solutions.map((solution, index) => (
        <Solution 
          key={`${solution.id}_${index}`}
          solution={solution}
        />
      ))}
      {hasNextPage && <div ref={ref} className="h-10"/>}
    </div>
  )
}