"use client"

import { useRouter } from "next/navigation"
import { X } from "lucide-react";

export default function PrSolutionsPage() {
  const router = useRouter();

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="p-4 flex justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              다른 사람 풀이
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              다양한 접근법을 살펴보고 더 나은 해결 방법을 찾아보세요!
            </p>
          </div>
          <button
            className="text-gray-500 cursor-pointer flex items-start"
            onClick={() => router.replace('/home')}
          >
            <X className="w-7 h-7"/>
          </button>
        </div>
      </div>
    </div>
  )
}