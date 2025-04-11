"use client"

import { useRouter } from "next/navigation";

type UnderDevelopmentProps = {
  title?: string;
  message?: string;
}

const UnderDevelopment: React.FC<UnderDevelopmentProps> = ({
  title = "기능 개발 중",
  message = "현재 이 기능은 개발 중입니다. 곧 만나보실 수 있어요!",
}) => {
  const router = useRouter();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-6 rounded-lg bg-white shadow-md relative">
      <button 
        onClick={() => router.back()}
        className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        aria-label="돌아가기"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-6 h-6 text-gray-700"
        >
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>

      <div className="mb-6 relative">
        <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-12 h-12 text-white"
          >
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-4">{message}</p>
    </div>
  );
};

export default UnderDevelopment;