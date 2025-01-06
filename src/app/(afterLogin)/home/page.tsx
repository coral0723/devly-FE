import BottomNavigation from "../_component/BottomNavigation";
import FirstIconSection from "./_component/FirstIconSection";
import Header from "./_component/Header";
import MainFeatures from "./_component/MainFeatures";
import RecentActivities from "./_component/RecentActivities";
import SecondIconSection from "./_component/SecondIconSection";
import WeeklyActivity from "./_component/WeeklyActivity";


export default function Home() {
  return (
    <div className="max-w-lg mx-auto min-h-[100dvh] bg-gray-50 flex flex-col">
      <Header/>
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
        </div>
      </div>
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white safe-area-bottom"> {/* iOS safe area 고려 */}
          <div className="max-w-lg mx-auto border-t border-gray-200">
              <BottomNavigation/>
          </div>
        </div>
    </div>
  );
}
