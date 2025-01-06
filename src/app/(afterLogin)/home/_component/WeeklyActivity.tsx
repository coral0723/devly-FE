export default function WeeklyActivity() {
    const weekActivities = [
        { day: '일', hasActivity: true },
        { day: '월', hasActivity: true },
        { day: '화', hasActivity: true },
        { day: '수', hasActivity: true },
        { day: '목', hasActivity: true },
        { day: '금', hasActivity: false },
        { day: '토', hasActivity: false }
    ];

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg">이번 주 활동</h2>
                <div className="flex items-center gap-1 text-yellow-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d69e2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                    </svg>
                    <span className="text-base font-medium">5일 연속</span>
                </div>
            </div>

            <div className="flex justify-between">
                {weekActivities.map(({day, hasActivity}) => (
                    <div key={day} className="flex flex-col items-center gap-3">
                        <span className={`text-base font-medium text-slate-700`}>
                            {day}
                        </span>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            hasActivity ? 'bg-slate-100' : 'bg-gray-50'
                        }`}>
                            {hasActivity ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M20 6 9 17l-5-5"/>
                                </svg>
                            ) : (
                                <span className="text-base text-gray-300">-</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
