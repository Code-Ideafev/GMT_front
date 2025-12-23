import axios from 'axios';

// 1. 도구 이름(axiosInstance)과 수빈이 주소(192.168.1.5)를 정확히 일치시킴
const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.5:8080', 
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

// 2. 에러 처리 (로그 확인용)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('통신 에러:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// 3. 혜린이 파일들(Singupfrom, EmailStep)이 찾는 이름들 다 정의해줌
export const signUpApi = (data) => axiosInstance.post('/auth/join', data);
export const loginApi = (data) => axiosInstance.post('/auth/login', data);
export const sendEmailApi = (email) => axiosInstance.post('/email/send', { email });
export const verifyEmailApi = (email, code) => axiosInstance.post('/email/verify', { email, code });

export default axiosInstance;