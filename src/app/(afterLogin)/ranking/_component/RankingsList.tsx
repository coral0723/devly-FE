"use client"

import { Rankings } from "@/model/Rankings";
import { ArrowDown, ArrowUp, Crown, Minus } from "lucide-react";

type Props = {
  rankings: Rankings
}

export default function RankingsList({rankings}: Props) {
  const getRankings = () => {
    // 내가 상위권일 경우 자연스럽게 연결
    if (rankings.myRank <= 9) {
      return rankings.rankings.filter(r => r.rank as number <= 10 || r.type === 'separator');
    }

    return rankings.rankings;
  };

  const RankBadge = ({rank} : {rank: number} ) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Crown className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Crown className="w-6 h-6 text-amber-600" />;
    return <span className="text-gray-500 font-medium">{rank}</span>;
  };

  const ChangeIndicator = ({change} : {change: string} ) => {
    switch (change) {
      case 'up':
        return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <ArrowDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {getRankings().map((user, idx) => (
        user.type === 'separator' ? (
          <div key="separator" className="py-4 text-center text-gray-400 border-b border-gray-100">
              • • •
          </div>
        ) : (
          <div
            key={idx}
            className={`p-4 flex items-center justify-between border-b border-gray-100 last:border-0 
              ${user.isMe ? 'bg-purple-50' : ''}`}
          >
          <div className="flex items-center gap-4">
            <div className="w-8 flex justify-center">
              <RankBadge rank={user.rank as number} />
            </div>
            <div>
              <div className="font-medium flex items-center gap-2">
                {user.name}
                {user.isMe && (
                  <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full">
                    나
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500">Level {user.level}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-semibold">{user.score!.toLocaleString()}</div>
              <div className="flex items-center justify-end gap-1">
                <ChangeIndicator change={user.change!} />
              </div>
            </div>
          </div>
          </div>
        )
      ))}
    </div>
  )
}