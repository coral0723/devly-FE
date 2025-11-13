"use client"

import { useQuery } from "@tanstack/react-query"
import Header from "./Header"
import MyRanking from "./MyRanking"
import RankingsList from "./RankingsList"
import { Rankings } from "@/model/Rankings"
import { getRankings } from "../_lib/getRankings"
import LoadingSpinner from "@/app/_component/LoadingSpinner"
import BottomNavigation from "../../_component/BottomNavigation"

export default function RankingPage() {
  const {data: rankings} = useQuery<Rankings, object, Rankings, [_1: string]>({
    queryKey: ["rankings"],
    queryFn: getRankings,
    staleTime: 0,
  })

  // 데이터 로딩 중일 때 표시할 내용
  if (!rankings) {
    return (
      <div className="h-[100dvh] bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size={"md"}/>
        <BottomNavigation/>
      </div>
    )
  }

  return (
    <>
      <Header totalUsers={rankings.totalUsers}/>

      {/* Main Content */}
      <div className="p-4 overflow-y-auto pt-[105px] scrollbar-hide" style={{ height: 'calc(100vh - 75px)' }}>
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