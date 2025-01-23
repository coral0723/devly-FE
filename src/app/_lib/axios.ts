import axios from 'axios';

// 기본 인스턴스
const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

// 인증이 필요한 요청을 위한 인스턴스
const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

// 인증 인스턴스에만 토큰 인터셉터 추가
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api, authApi };

// 사용 예시
// api.get('/public-endpoint');  // 토큰 미포함
// authApi.get('/private-endpoint');  // 토큰 포함

// FormData를 보내는 경우
// authApi.post('/upload', formData, {
//   headers: { 'Content-Type': 'multipart/form-data' }
// });
