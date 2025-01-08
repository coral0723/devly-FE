'use client'
import React, { useState } from 'react';
import { Crown, Trophy, Users, Share2, Copy, ArrowUp, ArrowDown, Minus, Book, GitPullRequest, MessageSquare } from 'lucide-react';
import BottomNavigation from '../_component/BottomNavigation';

export default function RankingPage() {
    const [activeTab, setActiveTab] = useState('global');
    const [showInviteModal, setShowInviteModal] = useState(false);

    // 전체 랭킹 데이터 (예시)
    const totalUsers = 1247;
    const friends = 5;
    const myRank = 42;

    const getRankings = () => {
        if (activeTab === 'global') {
            const rankings = [
                // Top 3
                { rank: 1, name: "김서준", score: 2840, level: 8, change: 'up' },
                { rank: 2, name: "이도윤", score: 2790, level: 7, change: 'same' },
                { rank: 3, name: "박지호", score: 2755, level: 7, change: 'up' },
                // 4-5위
                { rank: 4, name: "최수아", score: 2720, level: 6, change: 'down' },
                { rank: 5, name: "정하준", score: 2685, level: 6, change: 'up' },
                // 구분선
                { type: 'separator', rank: '...' },
                // 내 주변 순위
                { rank: 40, name: "장현우", score: 2250, level: 4, change: 'up' },
                { rank: 41, name: "임지원", score: 2235, level: 4, change: 'down' },
                { rank: 42, name: "박정수", score: 2220, level: 4, change: 'same', isMe: true },
                { rank: 42, name: "한소희", score: 2220, level: 4, change: 'up' },
                { rank: 44, name: "송태호", score: 2190, level: 4, change: 'down' },
            ];

            // 내가 상위권일 경우 자연스럽게 연결
            if (myRank <= 9) {
                return rankings.filter(r => r.rank <= 10 || r.type === 'separator');
            }

            return rankings;
        } else {
            // 친구 랭킹
            return [
                { rank: 1, name: "김민준", score: 2720, level: 6, change: 'up' },
                { rank: 2, name: "나개발", score: 2650, level: 6, change: 'same', isMe: true },
                { rank: 3, name: "박서윤", score: 2610, level: 5, change: 'down' },
                { rank: 4, name: "이하은", score: 2580, level: 5, change: 'up' },
            ];
        }
    };

    const RankBadge = ({ rank }) => {
        if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
        if (rank === 2) return <Crown className="w-6 h-6 text-gray-400" />;
        if (rank === 3) return <Crown className="w-6 h-6 text-amber-600" />;
        return <span className="text-gray-500 font-medium">{rank}</span>;
    };

    const ChangeIndicator = ({ change }) => {
        switch (change) {
            case 'up':
                return <ArrowUp className="w-4 h-4 text-green-500" />;
            case 'down':
                return <ArrowDown className="w-4 h-4 text-red-500" />;
            default:
                return <Minus className="w-4 h-4 text-gray-400" />;
        }
    };

    return (
        <div className="max-w-lg mx-auto min-h-screen bg-gray-50 pb-16">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="p-4">
                    <h1 className="text-xl font-semibold text-gray-900">랭킹</h1>
                    {activeTab === 'global' ? (
                        <p className="text-sm text-gray-500 mt-1">
                            전체 {totalUsers.toLocaleString()}명의 개발자가 함께 공부하고 있어요!
                        </p>
                    ) : (
                        <p className="text-sm text-gray-500 mt-1">
                            {friends.toLocaleString()}명의 친구와 함께하고 있어요
                        </p>
                    )}
                </div>

                {/* Tabs */}
                {/*<div className="flex border-b border-gray-200">*/}
                {/*    <button*/}
                {/*        onClick={() => setActiveTab('global')}*/}
                {/*        className={`flex-1 py-3 text-sm font-medium border-b-2 ${*/}
                {/*            activeTab === 'global'*/}
                {/*                ? 'border-purple-500 text-purple-600'*/}
                {/*                : 'border-transparent text-gray-500'*/}
                {/*        }`}*/}
                {/*    >*/}
                {/*        <div className="flex items-center justify-center gap-2">*/}
                {/*            <Trophy size={16} />*/}
                {/*            전체 랭킹*/}
                {/*        </div>*/}
                {/*    </button>*/}
                {/*    <button*/}
                {/*        onClick={() => setActiveTab('friends')}*/}
                {/*        className={`flex-1 py-3 text-sm font-medium border-b-2 ${*/}
                {/*            activeTab === 'friends'*/}
                {/*                ? 'border-purple-500 text-purple-600'*/}
                {/*                : 'border-transparent text-gray-500'*/}
                {/*        }`}*/}
                {/*    >*/}
                {/*        <div className="flex items-center justify-center gap-2">*/}
                {/*            <Users size={16} />*/}
                {/*            친구 랭킹*/}
                {/*        </div>*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>

            {/* Main Content */}
            <div className="p-4">
                {/* My Ranking Summary - 전체 랭킹에서만 표시 */}
                {activeTab === 'global' && (
                    <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-gray-500">나의 순위</div>
                            <div className="flex items-center gap-1">
                                <span className="text-sm text-gray-500">상위</span>
                                <span className="font-bold text-purple-600">
                  {Math.round((myRank / totalUsers) * 100)}%
                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <Trophy className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <div className="font-semibold">{myRank}위</div>
                                <div className="text-sm text-gray-500">
                                    전체 {totalUsers.toLocaleString()}명 중
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Rankings List */}
                <div className="bg-white rounded-xl border border-gray-200">
                    {getRankings().map((user, idx) => (
                        user.type === 'separator' ? (
                            <div key="separator" className="py-4 text-center text-gray-400 border-b border-gray-100">
                                • • •
                            </div>
                        ) : (
                            <div
                                key={idx}
                                className={`p-4 flex items-center justify-between border-b border-gray-100 last:border-0 ${
                                    user.isMe ? 'bg-purple-50' : ''
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-8 flex justify-center">
                                        <RankBadge rank={user.rank} />
                                    </div>
                                    <div>
                                        <div className="font-medium flex items-center gap-2">
                                            {user.name}
                                            {user.isMe && (
                                                <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full">
                          나
                        </span>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-500">Level {user.level}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="font-semibold">{user.score.toLocaleString()}</div>
                                        <div className="flex items-center justify-end gap-1">
                                            <ChangeIndicator change={user.change} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>

                {/* Friend Invite Button - Only show in friends tab */}
                {activeTab === 'friends' && (
                    <button
                        onClick={() => setShowInviteModal(true)}
                        className="mt-4 w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
                    >
                        <Share2 size={18} />
                        친구 초대하기
                    </button>
                )}
            </div>

            {/* Bottom Navigation */}
            <BottomNavigation/>

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-sm w-full p-4">
                        <h3 className="text-lg font-semibold mb-4">친구 초대하기</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            아래 코드를 공유하여 친구를 초대해보세요!
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between mb-4">
                            <code className="text-purple-600 font-mono">DEVLY-FR1END-2024</code>
                            <button
                                onClick={() => {/* Copy logic */}}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <Copy size={18} />
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowInviteModal(false)}
                                className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                            >
                                닫기
                            </button>
                            <button
                                onClick={() => {/* Share logic */}}
                                className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                            >
                                공유하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
