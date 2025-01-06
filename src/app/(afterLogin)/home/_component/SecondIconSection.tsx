"use client"

import {
  BookOpen,
  FileCode,
} from 'lucide-react';

export default function SecondIconSection() {
  return (
    <div className="relative h-9 z-0"> 
      <div className="absolute right-10 animate-float-medium">
          <BookOpen size={30} className="text-emerald-500 opacity-20"/>
      </div>
      <div className="absolute left-10 animate-float-slow">
          <FileCode size={30} className="text-orange-500 opacity-20"/>
      </div>
    </div>
  )
}