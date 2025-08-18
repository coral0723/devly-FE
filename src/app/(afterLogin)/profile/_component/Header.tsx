"use client"

import { ArrowLeft, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  
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
      </div>
    </div>
  )
}