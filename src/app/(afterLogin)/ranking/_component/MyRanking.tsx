"use client"

import { Trophy } from "lucide-react";

type Props = {
  myRank: number;
  totalUsers: number;
}

export default function MyRanking({myRank, totalUsers}: Props) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
    <div className="flex items-center justify-between mb-2">
      <div className="text-sm text-gray-500">나의 순위</div>
      <div className="flex items-center gap-1">
        <span className="text-sm text-gray-500">상위</span>
        <span className="font-bold text-purple-600">
          {Math.round((myRank / totalUsers) * 100)}%
        </span>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
        <Trophy className="w-6 h-6 text-purple-600" />
      </div>
      <div>
        <div className="font-semibold">{myRank}위</div>
        <div className="text-sm text-gray-500">
          전체 {totalUsers}명 중
        </div>
      </div>
    </div>
  </div>
  )
}