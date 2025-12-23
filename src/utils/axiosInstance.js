import axios from 'axios';

// 1. axios 기본 설정 (수빈이의 최신 IP 주소 적용)
const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.31:8080', 
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

// 2. [요청 인터셉터] 서버에 신호를 보낼 때마다 토큰이 있으면 자동으로 실어 보냄
axiosInstance.interceptors.request.use(
  (config) => {
    // 브라우저 저장소(localStorage)에서 토큰을 꺼내옵니다.
    const token = localStorage.getItem('accessToken'); 
    
    // 토큰이 있다면 'Bearer ' 방식을 붙여서 Authorization 헤더에 추가합니다.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. [응답 인터셉터] 서버에서 오는 에러를 콘솔에 예쁘게 찍어줌
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('통신 에러:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// 4. API 함수들 정의 (혜린이의 모든 컴포넌트에서 사용하는 이름들)
export const signUpApi = (data) => axiosInstance.post('/auth/join', data);
export const loginApi = (data) => axiosInstance.post('/auth/login', data);
export const sendEmailApi = (email) => axiosInstance.post('/email/send', { email });
export const verifyEmailApi = (email, code) => axiosInstance.post('/email/verify', { email, code });

export default axiosInstance;