"use client"

import { useRouter } from 'next/navigation';

type Props = {
    totalWords: number;
}

export function CompletionModal({ totalWords }: Props) {
    const router = useRouter();

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34c57e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
                    </svg>

                </div>
                <h2 className="text-xl font-bold mb-2">학습 완료! 🎉</h2>
                <p className="text-gray-600 mb-2">
                    오늘의 {totalWords}개 단어를 모두 학습했어요
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="text-sm text-gray-500 mb-1">획득한 경험치</div>
                    <div className="text-2xl font-bold text-green-600">+100 XP</div>
                </div>
                <button
                    onClick={() => router.push('/home')}
                    className="w-full py-4 bg-green-500 text-white rounded-xl text-lg font-medium hover:bg-green-600"
                >
                    완료
                </button>
            </div>
        </div>
    );
}