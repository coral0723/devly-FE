"use client"

import { CheckCircle, AlertCircle } from 'lucide-react';

interface FeedbackStepProps {
    feedback: {
        accuracy: number;
        message: string;
    };
    onNext: () => void;
}

export function FeedbackStep({ feedback, onNext }: FeedbackStepProps) {
    return (
        <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="mb-4">
                    {feedback.accuracy >= 80 ? (
                        <CheckCircle size={48} className="text-green-500 mx-auto"/>
                    ) : (
                        <AlertCircle size={48} className="text-yellow-500 mx-auto"/>
                    )}
                </div>
                <div className="text-2xl font-bold mb-2">
                    {feedback.accuracy}점
                </div>
                <p className="text-gray-600">{feedback.message}</p>
            </div>
            <button
                onClick={onNext}
                className="w-full py-4 bg-green-500 text-white rounded-xl text-lg font-medium hover:bg-green-600 active:scale-[0.98] transition-all"
            >
                다음 단어
            </button>
        </div>
    );
}