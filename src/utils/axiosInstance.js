import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.148:8080', 
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

// 모든 API 요청 전에 실행되는 인터셉터
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); 
  
  if (token) {
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
export const resetPasswordApi = (data) => axiosInstance.post('/auth/reset-password', data);
export const sendEmailApi = (email) => axiosInstance.post('/email/send', { email });
export const verifyEmailApi = (email, code) => axiosInstance.post('/email/verify', { email, code });

// 타이머 관련
export const startTimerApi = () => axiosInstance.get('/timer/startTime');
export const stopTimerApi = () => axiosInstance.get('/timer/endTime');

// 마이페이지 데이터 관련
export const getUserListApi = () => axiosInstance.get('/auth/list'); 
export const getTimerListApi = () => axiosInstance.get('/timer/list');

// ⭐ [중요] 빠져있던 프로필 수정 API 다시 추가
export const updateProfileApi = (imageUrl) => axiosInstance.post('/user/profile', {
  profileImageUrl: imageUrl
});

export default axiosInstance;