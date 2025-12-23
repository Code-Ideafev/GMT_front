import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.31:8080', 
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

// [중요] 모든 API 요청 전에 실행되는 인터셉터
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); 
  
  if (token) {
    // 백엔드가 인식할 수 있도록 헤더에 토큰 주입
    config.headers.Authorization = `Bearer ${token}`;
    console.log("✅ 토큰 주입 성공: 요청을 보냅니다.");
  } else {
    console.error("❌ 토큰 없음: 'accessToken'이 로컬스토리지에 있는지 확인하세요.");
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('⚠️ 통신 에러 발생:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// --- API 함수 리스트 ---
export const signUpApi = (data) => axiosInstance.post('/auth/join', data);
export const loginApi = (data) => axiosInstance.post('/auth/login', data);
export const sendEmailApi = (email) => axiosInstance.post('/email/send', { email });
export const verifyEmailApi = (email, code) => axiosInstance.post('/email/verify', { email, code });

// 타이머 관련
export const startTimerApi = () => axiosInstance.get('/timer/startTime');
export const stopTimerApi = () => axiosInstance.get('/timer/endTime');

// 마이페이지 데이터 관련 (새로 추가)
export const getUserListApi = () => axiosInstance.get('/user/list');
export const getTimerListApi = () => axiosInstance.get('/timer/list');

export default axiosInstance;