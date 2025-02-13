"use client"

import { useRouter } from "next/navigation"

type Props = {
  groupId: string;
  wordTotal: string;
}

export default function BottomButton({groupId, wordTotal}: Props) {
  const router = useRouter();
  
  return (
    <div className="fixed w-full max-w-lg bottom-0 left-1/2 transform -translate-x-1/2 p-2 bg-white border border-gray-200 z-10">
      <button
          onClick={() => {
            if(groupId) {
              router.replace(`/words/learn?groupId=${groupId}`);
            } else {
              router.replace('/home');
            }
          }}
          className={`w-full py-3 text-white rounded-xl text-lg font-medium active:scale-[0.98] transition-all 
          ${wordTotal !== "5" ? "bg-rose-500 hover:bg-rose-600 " : "bg-green-500 hover:bg-green-600"}`}
      >
          {wordTotal && wordTotal !== "5" ? "오답 풀기" : "학습 시작하기"}
      </button>
    </div>
  )
}