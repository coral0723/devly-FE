"use client"

import { ChevronLeft } from 'lucide-react';
import Link from "next/link";

export default function BackButton() {

  return (
    <div className="inline-block p-4 md:p-6">
      <Link
        className="p-2 -ml-2 hover:bg-gray-100 rounded-full flex items-center"
        href={'/home'}
        replace
      >
        <ChevronLeft size={24} className="text-gray-600" />
      </Link>
    </div>
  )
}