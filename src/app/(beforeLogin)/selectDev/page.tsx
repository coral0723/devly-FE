'use client';

export default function SelectDevPage() {
  
  const handleDeveloperSelect = (type: number) => {
    // 백엔드로 리다이렉트하면서 developer type 전달
    window.location.href = `/oauth2/authorization/google?developerType=${type}`;
  };

  return (
    <div>
      <h1>개발자 유형을 선택해주세요</h1>
      <button onClick={() => handleDeveloperSelect(0)}>
        Backend Developer
      </button>
      <button onClick={() => handleDeveloperSelect(1)}>
        Frontend Developer
      </button>
    </div>
  );
}