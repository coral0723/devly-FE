'use client';

import { useRouter } from 'next/navigation';
import {BookOpen, Mic, GitPullRequest, Code, Terminal, FileCode} from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function Main() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white-50 to-white relative overflow-hidden">
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
                    <div className="inline-block mb-1 mt-8">
                      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="222px" height="96px" viewBox="0 0 88 45">
                        <path fill="currentColor" transform="translate(0, -16)"
                              d="M11.34,45.8l-0.252-1.484c-0.392,0.392-1.82,1.764-4.228,1.764c-3.92,0-5.74-2.856-5.74-7.476c0-5.264,2.52-8.204,7.644-8.204c0.672,0,1.484,0.14,2.1,0.28l0-3.556l-2.24-0.56l0-2.24l6.44-0.224l0,18.704l2.24,0.56l0,2.24z M10.864,41.124l0-6.944c-0.532-0.252-1.372-0.42-2.184-0.42c-2.38,0-3.22,1.82-3.22,4.62c0,2.828,0.784,4.34,2.688,4.34c1.792,0,2.716-1.596,2.716-1.596z M34.45428,39.164l-9.296,0c0.168,2.24,1.456,3.556,3.388,3.556c2.324,0,4.704-1.316,4.704-1.316l1.204,2.324s-2.8,2.352-6.384,2.352c-4.816,0-7.28-2.8-7.28-7.56c0-4.9,2.772-8.12,7.476-8.12c4.172,0,6.356,2.576,6.356,6.58c0,1.064-0.168,2.1-0.168,2.184z M25.21428,36.56l5.068,0c0-1.596-0.672-2.8-2.296-2.8c-1.568,0-2.548,1.148-2.772,2.8z M46.84456,33.06l0-2.24l7.336-0.14l0,2.38l-1.596,0.364l-4.508,12.376l-4.62,0l-4.424-12.292l-1.344-0.448l0-2.24l7.336-0.14l0,2.38l-1.568,0.28l2.548,8.26l2.464-8.176z M63.29484,42.86l2.52,0.7l0,2.24l-8.988,0l0-2.24l2.24-0.7l0-15.736l-2.24-0.56l0-2.24l6.468-0.224l0,18.76z M68.04112,33.06l0-2.24l7.476-0.14l0,2.38l-1.568,0.28l2.492,7.84l2.38-7.756l-1.624-0.364l0-2.24l7.532-0.14l0,2.38l-1.736,0.364l-4.116,11.48c-1.344,3.696-3.164,7.616-7.616,7.616c-0.952,0-2.716-0.224-2.716-0.224l0.392-2.996l1.82,0c2.24,0,3.276-2.38,3.752-3.472l-4.984-12.32z"/>
                      </svg>
                    </div>
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
                        // onClick={() => router.push('/home')}
                        onClick={() => signIn('google')}
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
