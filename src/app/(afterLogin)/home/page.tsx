import BottomNavigation from "../_component/BottomNavigation";
import Header from "./_component/Header";
import MainFeatures from "./_component/MainFeatures";
import WeeklyActivity from "./_component/WeeklyActivity";

export default function Home() {
  // const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="mx-auto bg-gray-50">
      <div className="max-w-xl mx-auto h-[100dvh] flex flex-col">
        <Header/>
        <div className="flex-1 mt-[65px] overflow-y-auto scrollbar-hide"> {/* 헤더 높이만큼 뺌 */}
          <div className="p-5 space-y-6 relative z-10 pb-24"> {/* 하단 패딩 증가 */}
            <MainFeatures/>
            {/* First Icon Section */}
            <div className="relative h-9 z-0"> 
              <div className="absolute left-10 animate-float-slow">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.2 }}>
                  <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                </svg>
              </div>
              <div className="absolute right-10 animate-float-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.2 }}>
                  <polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>
                </svg>
              </div>
            </div>
            {/* {isDevelopment && <WeeklyActivity/>} */}
            <WeeklyActivity/>
            {/* Second Icon Section */}
            <div className="relative h-9 z-0"> 
              <div className="absolute right-10 animate-float-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.2 }}>
                  <path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
                </svg>
              </div>
              <div className="absolute left-10 animate-float-slow">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.2 }}>
                  <path d="M10 12.5 8 15l2 2.5"/><path d="m14 12.5 2 2.5-2 2.5"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/>
                </svg>
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
    </div>
  );
}
