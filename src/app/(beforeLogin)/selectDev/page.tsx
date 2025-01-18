'use client';

import { DeveloperType } from '@/model/User';

export default function SelectDevPage() {
  const handleDevTypeSelect = async (type: DeveloperType) => {
    try {
      // 백엔드에서 제공한 OAuth URL로 리다이렉트
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google?developerType=${type}`;
    } catch (error) {
      console.error('Failed to select developer type:', error)
    }
  }

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