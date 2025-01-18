'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Code, FileCode, GitPullRequest, Terminal } from 'lucide-react';
import LoadingSpinner from "@/app/_component/LoadingSpinner";

export default function AuthCallback() {
 const router = useRouter();

 useEffect(() => {
   const handleCallback = async () => {
     const params = new URLSearchParams(window.location.search);
     const accessToken = params.get('access_token');
     const refreshToken = params.get('refresh_token');

     if (accessToken && refreshToken) {
       localStorage.setItem('accessToken', accessToken);
       localStorage.setItem('refreshToken', refreshToken);
       router.push('/home');
     } else {
      window.alert('문제가 발생했습니다.');
      router.push('/');
     }
   };

   handleCallback();
 }, [router]);

 return (
   <div className='min-h-screen bg-white-50 to-white relative overflow-hidden flex items-center justify-center'>
     {/* Floating Background Icons */}
     <div className='absolute inset-0 pointer-events-none'>
       <div className='absolute top-16 left-7 animate-float-slow opacity-20'>
         <Code size={40} className='text-blue-500'/>
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

     <LoadingSpinner size={"md"}/>
   </div>
 );
}