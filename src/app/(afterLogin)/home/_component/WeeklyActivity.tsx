"use client"

import { useEffect, useState } from "react";
import { BookOpen, GitPullRequest, Lightbulb, MessageSquare } from "lucide-react";
import { DailyActivity } from "@/model/DailyActivity";
import { useQuery } from "@tanstack/react-query";
import { getWeeklyActivity } from "../_lib/getWeeklyActivity";

export default function WeeklyActivity() {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const getCurrentDay = () => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const currentDay = days[new Date().getDay()];
    return currentDay;
  };

  // 컴포넌트 마운트 시 현재 요일 설정
  useEffect(() => {
    setSelectedDay(getCurrentDay());
  }, []);

  const {data: weeklyActivity} = useQuery<DailyActivity[], object, DailyActivity[], [_1: string]>({
    queryKey: ['weeklyActivity'],
    queryFn: getWeeklyActivity,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  })


  // 선택된 날짜의 활동을 필터링하는 함수
  const getFilteredActivities = () => {
    if (!selectedDay) return [];
    const dayData = weeklyActivity?.find(day => day.day === selectedDay);
    return dayData ? dayData.activities.map(activity => ({
      ...activity,
      date: new Date(activity.date) //json으로 응답이 오기 때문에 string이여서, Date 객체로 변환
    })) : [];
  };

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
        {weeklyActivity?.map((activity) => (
          <div
            key={activity.day}
            onClick={() => setSelectedDay(selectedDay === activity.day ? null : activity.day)}
            className={`flex flex-col items-center gap-3 cursor-pointer transition-colors ${
              selectedDay === activity.day ? 'opacity-100' : 'opacity-70'
            }`}
          >
            <span className={`text-base font-medium text-slate-700`}>
              {activity.day}
            </span>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              activity.activities.length ? 'bg-slate-100' : 'bg-gray-50'
            }`}>
              {activity.activities.length ? (
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

      {/* Activities */}
      <div className="space-y-3 mt-5">
        {getFilteredActivities().map((activity, index) => (
          <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
            <div
              className={`w-10 h-10 rounded-full bg-${
                activity.study === 'word' ? 'emerald' :
                activity.study === 'knowledge' ? 'blue' :
                activity.study === 'pr' ? 'purple' :
                'orange'
              }-100 flex items-center justify-center`}
            >
              {activity.study === 'word' && <BookOpen size={20} className={`text-emerald-600`} />}
              {activity.study === 'knowledge' && <Lightbulb size={20} className={`text-blue-600`} />}
              {activity.study === 'pr' && <GitPullRequest size={20} className={`text-purple-600`} />}
              {activity.study === 'discussion' && <MessageSquare size={20} className={`text-orange-600`} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-medium truncate">{activity.title}</p>
              <p className="text-sm text-gray-500">
                {activity.date.toLocaleDateString()}
              </p>
            </div>
            <span className={`flex items-end text-sm text-gray-600`}>
              +{activity.exp} XP
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}