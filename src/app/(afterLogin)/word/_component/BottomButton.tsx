"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { getWords } from "../_lib/getWords";
import { getValidationWordResult } from "../_lib/getValidationWordResult";

type Props = {
  studyId: string;
  wordTotal: string;
};

export default function BottomButton({ studyId, wordTotal }: Props) {
  const router = useRouter();
  const qc = useQueryClient();

  const prefetch = async () => {
    if (!studyId) return;
    await Promise.all([
      qc.prefetchQuery({
        queryKey: ["word", "learn", studyId],
        queryFn: getWords,
        staleTime: 60_000,
      }),
      qc.prefetchQuery({
        queryKey: ["word", "validation", studyId],
        queryFn: getValidationWordResult,
        staleTime: 60_000,
      }),
    ]);
  };

  const handleClick = async () => {
    if (studyId && wordTotal) {
      // 모바일에서는 hover가 없으니 클릭 직전에라도 prefetch
      await prefetch();
      router.replace(`/word/learn?studyId=${studyId}`);
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
          ${wordTotal !== "5" ? "bg-rose-500 hover:bg-rose-600 " : "bg-green-500 hover:bg-green-600"}`}
        >
          {wordTotal && wordTotal !== "5" ? "오답 풀기" : "학습 시작하기"}
        </button>
      </div>
    </div>
  );
}
