import axios from 'axios';

// 인증이 필요한 요청을 위한 인스턴스
const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true, //쿠키 자동 전송
});

export { authApi };

// 응답 인터셉터 추가 (토큰 만료 처리)
authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("error: ", error);
    // 네트워크 오류 처리 (ERR_NETWORK)
    if (error.code === "ERR_NETWORK" || !error.response) {
      console.log("네트워크 오류 또는 응답 없음");
      alert("서버 연결에 문제가 있거나 토큰이 만료되었습니다. 다시 로그인해주세요.");
      window.location.replace('/');
      return Promise.reject(error);
    }
    
    if (error.response) {
      // 토큰 만료 오류 처리
      if (error.response.status === 401 || 
          error.response.status === 403 ||
          error.response.status === 302
        ) {
        alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
        
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
