"use client"

import { usePathname} from 'next/navigation';
import {Book, BookmarkIcon, MessageCircleIcon, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NAV_ITEMS = [
    { path: '/home', label: '학습', icon: Book },
    { path: '/review', label: '복습', icon: BookmarkIcon },
    // { path: '/roadmap/backend', label: '로드맵', icon: MapIcon},
    { path: '/community', label: '커뮤니티', icon: MessageCircleIcon },
    { path: '/ranking', label: '랭킹', icon: Trophy }
];

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex justify-around py-3">
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
            <button
                key={path}
                className="flex flex-col items-center gap-1"
                onClick={() => {router.push(path)}}
            >
            <Icon
                size={20}
                className={pathname === path ? "text-purple-600" : "text-gray-400"}
            />
            <span
                className={`text-sm ${
                    pathname === path ? "text-purple-600" : "text-gray-400"
                }`}
            >
              {label}
            </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
