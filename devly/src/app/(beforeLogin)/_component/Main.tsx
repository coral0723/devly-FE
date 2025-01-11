'use client';

import { useRouter } from 'next/navigation';
import {BookOpen, Mic, GitPullRequest, Code, Terminal, FileCode} from 'lucide-react';

export default function Main() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white relative overflow-hidden">
            {/* Floating Background Icons */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-16 left-7 animate-float-slow opacity-20">
                    <Code size={40} className="text-blue-500"/>
                </div>
                <div className="absolute top-24 right-5 animate-float-medium opacity-20">
                    <Terminal size={40} className="text-purple-500"/>
                </div>
                <div className="absolute bottom-40 left-20 animate-float-fast opacity-20">
                    <FileCode size={40} className="text-emerald-500"/>
                </div>
                <div className="absolute bottom-40 right-20 animate-float-medium opacity-20">
                    <GitPullRequest size={40} className="text-orange-500"/>
                </div>
            </div>

            <div className="max-w-lg mx-auto px-6 py-0 relative z-10">
                {/* Logo & Title */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="72px" height="32px"
                             viewBox="0 0 88 45">
                            <path fill="currentColor" transform="translate(0, -16)" d="..."/>
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                       Dev: Daily
                    </h1>
                    <p className="text-gray-600 mb-2 font-medium">개발자를 위한 영어 학습 플랫폼</p>
                </div>

                {/* Feature Cards */}
                <div className="space-y-4 mb-7">
                    <div
                        className="bg-white rounded-xl p-4 border border-gray-200 flex items-start gap-4 transform hover:scale-[1.02] transition-all">
                        <div
                            className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                            <BookOpen className="w-6 h-6 text-emerald-600"/>
                        </div>
                        <div>
                            <h3 className="font-medium mb-1">실무 중심 영어 단어</h3>
                            <p className="text-sm text-gray-600">
                                문서에서 자주 사용되는 단어와 표현을 효과적으로 학습하세요
                            </p>
                        </div>
                    </div>

                    <div
                        className="bg-white rounded-xl p-4 border border-gray-200 flex items-start gap-4 transform hover:scale-[1.02] transition-all">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                            <Mic className="w-6 h-6 text-blue-600"/>
                        </div>
                        <div>
                            <h3 className="font-medium mb-1">AI 영어 발음 교정</h3>
                            <p className="text-sm text-gray-600">
                                AI에게 발음을 교정받고 정확한 발음을 익히세요
                            </p>
                        </div>
                    </div>

                    <div
                        className="bg-white rounded-xl p-4 border border-gray-200 flex items-start gap-4 transform hover:scale-[1.02] transition-all">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                            <GitPullRequest className="w-6 h-6 text-purple-600"/>
                        </div>
                        <div>
                            <h3 className="font-medium mb-1">모의 영어 PR</h3>
                            <p className="text-sm text-gray-600">
                                실제 상황과 유사한 PR 작성 및 리뷰 연습을 해보세요
                            </p>
                        </div>
                    </div>

                    {/*<div*/}
                    {/*    className="bg-white rounded-xl p-4 border border-gray-200 flex items-start gap-4 transform hover:scale-[1.02] transition-all">*/}
                    {/*    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">*/}
                    {/*        <MessageSquare className="w-6 h-6 text-orange-600"/>*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        <h3 className="font-medium mb-1">개발 토론 스피킹</h3>*/}
                    {/*        <p className="text-sm text-gray-600">*/}
                    {/*            실제 개발 토론 상황에서 사용되는 영어 표현을 연습하세요*/}
                    {/*        </p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                {/* Login Button */}
                <div className="space-y-4 mb-10">
                    <button
                        onClick={() => router.push('/')}
                        className="w-full py-4 bg-white border border-gray-300 rounded-xl font-medium hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-sm"
                    >
                        <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                        </svg>
                        Google로 시작하기
                    </button>

                    <div className="text-center">
                        <p className="text-xs text-gray-500">
                            시작하기를 클릭하면 서비스 이용약관에 동의하게 됩니다
                        </p>
                    </div>
                </div>
            </div>
            {/* Animations */}
            <style jsx>{`
                @keyframes float-slow {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(6deg);
                    }
                }

                @keyframes float-medium {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-15px) rotate(-6deg);
                    }
                }

                @keyframes float-fast {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-10px) rotate(3deg);
                    }
                }

                .animate-float-slow {
                    animation: float-slow 6s ease-in-out infinite;
                }

                .animate-float-medium {
                    animation: float-medium 5s ease-in-out infinite;
                }

                .animate-float-fast {
                    animation: float-fast 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
