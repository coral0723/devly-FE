'use client';

import { DeveloperType } from '@/model/User';
import { Code, FileCode, GitPullRequest, Terminal } from 'lucide-react';

export default function SelectDevPage() {
  const handleDevTypeSelect = async (type: DeveloperType) => {
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google?developerType=${type}`;
    } catch (error) {
      console.error('Failed to select developer type:', error)
    }
  }

  return (
    <div className='min-h-screen bg-white-50 to-white relative overflow-hidden flex items-center justify-center'>
      {/* Floating Background Icons */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-16 left-7 animate-float-slow opacity-20'>
          <Code size={40} className='text-blue-500'/>
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

      <div className='max-w-lg mx-auto px-6 relative z-10'>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">개발자 유형을 선택해주세요</h1>
          <p className="text-gray-600">선택하신 개발자 유형에 맞는 학습 콘텐츠를 제공해드립니다</p>
        </div>
        <div className="space-y-4">
          <button
            className="w-full py-4 bg-white border border-gray-300 rounded-xl font-medium hover:bg-gray-50 active:scale-[0.98] transition-all"
            onClick={() => handleDevTypeSelect(DeveloperType.BACKEND)}
          >
            Backend Developer
          </button>
          <button
            className="w-full py-4 bg-white border border-gray-300 rounded-xl font-medium hover:bg-gray-50 active:scale-[0.98] transition-all"
            onClick={() => handleDevTypeSelect(DeveloperType.FRONTEND)}
          >
            Frontend Developer
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            선택하신 개발자 유형은 나중에 변경하실 수 있습니다
          </p>
        </div>
      </div>
    </div>
  );
}