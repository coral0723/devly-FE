"use client";

// 최근 활동 섹션 수정
import {Sparkles, ChevronRight, BookOpen, Lightbulb, GitPullRequest, MessageSquare} from "lucide-react";
import { useRouter } from "next/navigation";

// 활동 내역 컴포넌트 (빈 상태 포함)
export default function RecentActivities() {
  const router = useRouter();
    const activities = [
        {
            id: 1,
            type: 'word',
            title: '오늘의 개발 용어 10개 완료',
            detail: '발음 정확도: 92%',
            time: '10분 전',
            xp: 30,
            icon: BookOpen,
            color: 'emerald'
        },
        {
            id: 2,
            type: 'knowledge',
            title: '버블정렬 알고리즘의 이해',
            detail: '학습 완료',
            time: '1시간 전',
            xp: 50,
            icon: Lightbulb,
            color: 'blue'
        },
        {
            id: 3,
            type: 'pr',
            title: 'API 에러 핸들링 PR 리뷰',
            detail: '4개의 질문에 답변 완료',
            time: '2시간 전',
            xp: 80,
            icon: GitPullRequest,
            color: 'purple'
        },
        {
            id: 4,
            type: 'discussion',
            title: 'MSA 구조 설계 토론',
            detail: '발음 정확도: 88%',
            time: '3시간 전',
            xp: 100,
            icon: MessageSquare,
            color: 'orange'
        }
    ];

    if (!activities || activities.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-4 min-h-[200px] flex flex-col items-center justify-center text-center">
                <Sparkles className="w-12 h-12 text-gray-300 mb-2" />
                <p className="text-gray-600 font-medium">아직 학습 기록이 없어요</p>
                <p className="text-sm text-gray-500 mt-1">첫 학습을 시작해보세요!</p>
            </div>
        );
    }

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-medium">최근 활동</h2>
                <button
                    onClick={() => {router.push('/activities')}}
                    className="flex items-center gap-1 p-2 -m-2"
                >
                    <span className="text-base text-gray-500">더보기</span>
                    <ChevronRight size={20} className="text-gray-400"/>
                </button>
            </div>
            <div className="space-y-3">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                        <div
                            className={`w-10 h-10 rounded-full bg-${activity.color}-100 flex items-center justify-center`}>
                            <activity.icon size={20} className={`text-${activity.color}-600`}/>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-base font-medium truncate">{activity.title}</p>
                            <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                        <span className={`flex items-end text-sm text-gray-600`}>
                          +{activity.xp} XP
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
