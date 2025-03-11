"use client"

import { useRouter } from "next/navigation";
import { ChevronLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="py-4">
      <button
        onClick={() => router.push('/home')}
        className="p-2 -ml-2 hover:bg-gray-100 rounded-full flex items-center"
      >
        <ChevronLeft size={24} className="text-gray-600" />
      </button>
    </div>
  )
}