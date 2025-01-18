'use client';

import Link from "next/link";
import { NextPage } from "next";
import { Home, Code, Terminal, FileCode, GitPullRequest } from 'lucide-react';

const NotFound: NextPage = () => {
  return (
    <div className="min-h-screen bg-white-50 to-white relative overflow-hidden">
      {/* Floating Background Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-7 animate-float-slow opacity-20">
          <Code size={40} className="text-blue-500"/>
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

      <div className="max-w-lg mx-auto px-6 py-20 relative z-10">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="inline-block mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="222px" height="96px" viewBox="0 0 88 45">
              <path fill="currentColor" transform="translate(0, -16)"
                    d="M11.34,45.8l-0.252-1.484c-0.392,0.392-1.82,1.764-4.228,1.764c-3.92,0-5.74-2.856-5.74-7.476c0-5.264,2.52-8.204,7.644-8.204c0.672,0,1.484,0.14,2.1,0.28l0-3.556l-2.24-0.56l0-2.24l6.44-0.224l0,18.704l2.24,0.56l0,2.24z M10.864,41.124l0-6.944c-0.532-0.252-1.372-0.42-2.184-0.42c-2.38,0-3.22,1.82-3.22,4.62c0,2.828,0.784,4.34,2.688,4.34c1.792,0,2.716-1.596,2.716-1.596z M34.45428,39.164l-9.296,0c0.168,2.24,1.456,3.556,3.388,3.556c2.324,0,4.704-1.316,4.704-1.316l1.204,2.324s-2.8,2.352-6.384,2.352c-4.816,0-7.28-2.8-7.28-7.56c0-4.9,2.772-8.12,7.476-8.12c4.172,0,6.356,2.576,6.356,6.58c0,1.064-0.168,2.1-0.168,2.184z M25.21428,36.56l5.068,0c0-1.596-0.672-2.8-2.296-2.8c-1.568,0-2.548,1.148-2.772,2.8z M46.84456,33.06l0-2.24l7.336-0.14l0,2.38l-1.596,0.364l-4.508,12.376l-4.62,0l-4.424-12.292l-1.344-0.448l0-2.24l7.336-0.14l0,2.38l-1.568,0.28l2.548,8.26l2.464-8.176z M63.29484,42.86l2.52,0.7l0,2.24l-8.988,0l0-2.24l2.24-0.7l0-15.736l-2.24-0.56l0-2.24l6.468-0.224l0,18.76z M68.04112,33.06l0-2.24l7.476-0.14l0,2.38l-1.568,0.28l2.492,7.84l2.38-7.756l-1.624-0.364l0-2.24l7.532-0.14l0,2.38l-1.736,0.364l-4.116,11.48c-1.344,3.696-3.164,7.616-7.616,7.616c-0.952,0-2.716-0.224-2.716-0.224l0.392-2.996l1.82,0c2.24,0,3.276-2.38,3.752-3.472l-4.984-12.32z"/>
            </svg>
          </div>
        </div>

        {/* 404 Content */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl font-medium text-gray-700">페이지를 찾을 수 없습니다</h2>
          <p className="text-gray-600">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
        </div>

        {/* Home Button */}
        <div className="mt-8">
          <Link href="/" 
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-sm">
            <Home className="w-5 h-5" />
            메인으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;