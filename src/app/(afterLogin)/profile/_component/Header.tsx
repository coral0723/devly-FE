"use client"

import axios from 'axios';
import { ArrowLeft, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/api/mockLogout"); // 쿠키 삭제 API 호출
      router.replace("/"); // 로그아웃 후 리다이렉트
    } catch (err) {
      console.error("로그아웃 실패:", err);
    }
  };

  return (
    <div className="bg-white p-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <Link
          className="p-2 hover:bg-gray-100 rounded-lg"
          href={'/home'}
          replace
        >
          <ArrowLeft size={20} />
        </Link>
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