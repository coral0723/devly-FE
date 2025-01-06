"use client"

import {CheckIcon, Trophy} from 'lucide-react';  // Brain 대신 Lightbulb 사용

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
                    <Trophy size={20}/>
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
                                <CheckIcon size={24} className="text-slate-600"/>
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
