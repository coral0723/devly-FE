"use client"

import BottomNavigation from "../../_component/BottomNavigation";
import RecentActivities from "./RecentActivities";
import WeeklyActivity from "./WeeklyActivity";
import FirstIconSection from "./FirstIconSection";
import MainFeatures from "./MainFeatures";
import SecondIconSection from "./SecondIconSection";

export default function Main() {
  return (
    <>
      <div className="flex-1 overflow-auto h-[calc(100vh-64px)]"> {/* 헤더 높이만큼 뺌 */}
        <div className="p-5 space-y-6 relative z-10 pb-10"> {/* 하단 패딩 증가 */}
            <MainFeatures/>
            <FirstIconSection/>
            <WeeklyActivity/>
            <SecondIconSection/>

            {/* Recent Activities */}
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-6 relative z-10 pb-24 space-below"> {/* 하단 패딩 증가 */}
                  {/* 여기에서 다른 컴포넌트들 배치 */}
                  <RecentActivities/>
              </div>
            </div>
            {/* 하단 여백 */}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white safe-area-bottom"> {/* iOS safe area 고려 */}
        <div className="max-w-lg mx-auto border-t border-gray-200">
            <BottomNavigation/>
        </div>
      </div>
    </>
  )
} 