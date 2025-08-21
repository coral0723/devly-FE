"use client"

import { ArrowLeft, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
  // localStorage에서 accessToken 삭제
  localStorage.removeItem('accessToken');

  // 로그아웃 후 로그인 페이지로 이동 (필요에 따라 경로 변경 가능)
  router.push('/');
};
  
  return (
    <div className="bg-white p-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        {/* <button
          onClick={() => router.push('/settings')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <Settings size={20} />
        </button> */}
        <button
          onClick={handleLogout}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  )
}