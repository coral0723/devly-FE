'use client';

import { useRouter } from 'next/navigation'
import { DeveloperType } from '@/model/User';

export default function SelectDevPage() {
  const router = useRouter()
  
  const handleDeveloperSelect = async (type: DeveloperType) => {
    try {
      // 백엔드로 개발자 타입과 함께 회원가입 요청
      const response = await fetch(`/oauth2/authorization/google?developerType=${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        // 성공적으로 계정이 생성되면 홈으로 리다이렉트
        router.push('/home')
      } else {
        console.error('Error creating account')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  };

  return (
    <div>
      <h1>개발자 유형을 선택해주세요</h1>
      <button onClick={() => handleDeveloperSelect(DeveloperType.BACKEND)}>
        Backend Developer
      </button>
      <button onClick={() => handleDeveloperSelect(DeveloperType.FRONTEND)}>
        Frontend Developer
      </button>
    </div>
  );
}