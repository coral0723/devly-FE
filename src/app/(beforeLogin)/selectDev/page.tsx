'use client';

import { useRouter } from 'next/navigation'
import { DeveloperType } from '@/model/User';
import { useSession } from 'next-auth/react';

export default function SelectDevPage() {
  const { data: session } = useSession();
  const router = useRouter()
  
  const handleDevTypeSelect = async (type: DeveloperType) => {
    try {
      // 백엔드에서 제공한 OAuth URL로 리다이렉트
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google?developerType=${type}`
    } catch (error) {
      console.error('Failed to select developer type:', error)
    }
  }

  // 세션이 없으면 홈으로 리다이렉트
  // if (!session) {
  //   router.push('/')
  //   return null
  // }

  return (
    <div>
      <h1>개발자 유형을 선택해주세요</h1>
      <button onClick={() => handleDevTypeSelect(DeveloperType.BACKEND)}>
        Backend Developer
      </button>
      <button onClick={() => handleDevTypeSelect(DeveloperType.FRONTEND)}>
        Frontend Developer
      </button>
    </div>
  );
}