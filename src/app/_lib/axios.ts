import axios from 'axios';

// 기본 설정이 적용된 axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

// 요청 인터셉터 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// 사용 예시
// import api from '@/lib/axios';
// 자동으로 baseURL이 붙고, 토큰이 헤더에 포함됨
// const response = await api.get('/users/me');
// const data = await api.post('/items', { name: 'item' });