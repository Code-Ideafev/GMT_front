import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.31:8080', 
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

// [중요] 요청을 보낼 때마다 토큰 상태를 체크합니다.
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); 
  
  if (token) {
    console.log("토큰을 확인했습니다.");
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // 403 에러의 주범: 로컬스토리지에 accessToken이 없을 때 실행됨
    console.error("토큰이 없습니다! 'accessToken' 이름을 확인하세요.");
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('통신 에러 발생:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export const signUpApi = (data) => axiosInstance.post('/auth/join', data);
export const loginApi = (data) => axiosInstance.post('/auth/login', data);
export const sendEmailApi = (email) => axiosInstance.post('/email/send', { email });
export const verifyEmailApi = (email, code) => axiosInstance.post('/email/verify', { email, code });

export const startTimerApi = () => axiosInstance.get('/timer/startTime');
export const stopTimerApi = () => axiosInstance.get('/timer/endTime');

export default axiosInstance;