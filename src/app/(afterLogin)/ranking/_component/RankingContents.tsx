"use client"

import { useQuery } from "@tanstack/react-query"
import Header from "./Header"
import MyRanking from "./MyRanking"
import RankingsList from "./RankingsList"
import { Rankings } from "@/model/Rankings"
import { getRankings } from "../_lib/getRankings"

export default function RankingContents() {
  const {data: rankings} = useQuery<Rankings, object, Rankings, [_1: string]>({
    queryKey: ["rankings"],
    queryFn: getRankings,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  })

  // 데이터 로딩 중일 때 표시할 내용
  if (!rankings) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <>
      <Header totalUsers={rankings.totalUsers}/>

      {/* Main Content */}
      <div className="p-4 overflow-y-auto scrollbar-hide" style={{ height: 'calc(100vh - 176px)' }}>
        <MyRanking
          myRank={rankings.myRank}
          totalUsers={rankings.totalUsers}
        />

        {/* Rankings List */}
        <RankingsList rankings={rankings}/>

      </div>
    </>
  )
}