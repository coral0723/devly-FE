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

  return (
    <>
      <Header totalUsers={rankings?.totalUsers!}/>

      {/* Main Content */}
      <div className="p-4 overflow-y-auto scrollbar-hide" style={{ height: 'calc(100vh - 176px)' }}>
        <MyRanking
          myRank={rankings?.myRank!}
          totalUsers={rankings?.totalUsers!}
        />

        {/* Rankings List */}
        <RankingsList rankings={rankings!}/>

      </div>
    </>
  )
}