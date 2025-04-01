import axios from 'axios';

// 인증이 필요한 요청을 위한 인스턴스
const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
});

// 인증 인스턴스 추가
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { authApi };

// 응답 인터셉터 추가 (토큰 만료 처리)
authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // 토큰 만료 오류 처리
      if (error.response.status === 401 || error.response.status === 403) {
        alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.removeItem('accessToken');
        
        // 인터셉터 내부에서는 router 사용이 불가능하므로 window.location 사용
        window.location.replace('/');
      }
      else if(error.response.status === 500) {
        alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
    
    return Promise.reject(error);
  }
);
