"use client"

import { useRouter } from "next/navigation"

type Props = {
  groupId: string;
}

export default function BottomButton({groupId}: Props) {
  const router = useRouter();
  
  return (
    <div className="fixed w-full max-w-lg left-1/2 transform -translate-x-1/2 bottom-0 left-0 right-0 p-2 bg-white border border-gray-200 z-10">
      <button
          onClick={() => router.push(`/knowledge/learn?groupId=${groupId}`)}
          className="w-full py-3 bg-blue-500 text-white rounded-xl text-lg font-medium hover:bg-blue-600 active:scale-[0.98] transition-all"
      >
          학습 시작하기
      </button>
    </div>
  )
}