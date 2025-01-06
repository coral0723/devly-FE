"use client"

import {
  Code,
  Terminal
} from 'lucide-react';

export default function FirstIconSection() {
  return (
    <div className="relative h-9 z-0"> 
      <div className="absolute left-10 animate-float-slow">
          <Code size={30} className="text-blue-500 opacity-20"/>
      </div>
      <div className="absolute right-10 animate-float-medium">
          <Terminal size={30} className="text-purple-500 opacity-20"/>
      </div>
    </div>
  )
}