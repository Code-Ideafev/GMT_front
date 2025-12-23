import axios from 'axios';

// 1. 공통 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 서버 주소
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. 공통 에러 처리 (인터셉터)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API 통신 에러:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// 3. 백엔드 명세서 기반 API 함수들
// 로그인 (POST /user/login)
export const loginApi = (data) => api.post('/user/login', data);

// 회원가입 (POST /user/join)
export const signUpApi = (data) => api.post('/user/join', data);

// 이메일 인증 번호 발송 (POST /email/send)
export const sendEmailApi = (email) => api.post('/email/send', { email });

// 인증 번호 확인 (POST /email/verify)
export const verifyEmailApi = (email, code) => api.post('/email/verify', { email, code });

export default api;