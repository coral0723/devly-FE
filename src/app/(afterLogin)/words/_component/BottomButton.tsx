"use client"

import { useRouter } from "next/navigation"

type Props = {
  groupId: string;
}

export default function BottomButton({groupId}: Props) {
  const router = useRouter();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 p-2 bg-white border-t border-gray-200 z-10">
      <button
          onClick={() => router.push(`/words/learn?groupId=${groupId}`)}
          className="w-full py-3 bg-green-500 text-white rounded-xl text-lg font-medium hover:bg-green-600 active:scale-[0.98] transition-all"
      >
          학습 시작하기
      </button>
    </div>
  )
}