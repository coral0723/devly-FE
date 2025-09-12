"use client"

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation"
import { getKnowledges } from "../_lib/getKnowledges";
import { getValidationKnowledgeResult } from "../_lib/getValidationKnowledgeResult";
import { msUntilNextMidnight } from "../../../_utils/msUntilNextMidnight";

type Props = {
  studyId: string;
  knowledgeTotal: string;
}

export default function BottomButton({ studyId, knowledgeTotal }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const prefetch = async () => {
    const freshFor = msUntilNextMidnight();
    if (!studyId) return;
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ["knowledge", "learn", studyId],
        queryFn: getKnowledges,
        staleTime: freshFor,
      }),
      queryClient.prefetchQuery({
        queryKey: ["knowledge", "validation", studyId],
        queryFn: getValidationKnowledgeResult,
        staleTime: freshFor,
      }),
    ]);
  };

  const handleClick = async () => {
    if (studyId && knowledgeTotal) {
      // 모바일에서는 hover가 없으니 클릭 직전에라도 prefetch
      await prefetch();
      router.replace(`/knowledge/${studyId}/learn`);
    } else {
      router.replace("/home");
    }
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 p-2 bg-white border border-gray-200 z-10">
      <div className="max-w-xl mx-auto">
        <button
          onMouseEnter={prefetch} // 데스크톱 hover prefetch
          onClick={handleClick}   // 모바일 fallback
          className={`w-full py-3 text-white rounded-xl text-lg font-medium active:scale-[0.98] transition-all 
            ${knowledgeTotal !== "3" ? "bg-rose-500 hover:bg-rose-600 " : "bg-blue-500 hover:bg-blue-600"}`}
        >
          학습 시작하기
        </button>
      </div>
    </div>
  )
}