"use client"

import {
  BookOpen, Code, Terminal, FileCode
} from 'lucide-react';

export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-20 left-10 animate-float-slow opacity-10">
          <BookOpen size={40} className="text-emerald-500" />
      </div>
      <div className="absolute top-40 right-10 animate-float-medium opacity-10">
          <Code size={40} className="text-blue-500" />
      </div>
      <div className="absolute bottom-40 left-10 animate-float-fast opacity-10">
          <Terminal size={40} className="text-purple-500" />
      </div>
      <div className="absolute bottom-40 right-10 animate-float-medium opacity-10">
          <FileCode size={40} className="text-orange-500" />
      </div>
    </div>
  )
}