"use client"

import { useQuery } from "@tanstack/react-query";
import { Stats } from "@/model/Stats";
import { getProfileStats } from "../_lib/getProfileStats";

export default function ProfileStats() {
  const {data} = useQuery<Stats, object, Stats, [_1: string, _2: string]>({
    queryKey: ["profile", "stats"],
    queryFn: getProfileStats,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const statsConfig = [
    { label: "학습일수", key: "days", suffix: "일" },
    { label: "총 경험치", key: "exp", suffix: "" },
    { label: "학습한 용어", key: "words", suffix: "개" },
    { label: "학습한 지식", key: "knowledge", suffix: "개" },
    { label: "완료한 PR", key: "pr", suffix: "개" },
    { label: "참여 면접", key: "interview", suffix: "회" },
  ];
    
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {statsConfig.map((stat, idx) => (
        <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-gray-500 text-sm">{stat.label}</div>
          <div className="text-xl font-semibold mt-1">
            {data ? `${data[stat.key as keyof Stats]}${stat.suffix}` : '-'}
          </div>
        </div>
      ))}
    </div>
  )
}