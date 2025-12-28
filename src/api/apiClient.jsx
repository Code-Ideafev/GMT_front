import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.16.1.34:8080', 
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('⚠️ 통신 에러 발생:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export const signUpApi = (data) => axiosInstance.post('/auth/join', data);
export const loginApi = (data) => axiosInstance.post('/auth/login', data);
export const resetPasswordApi = (data) => axiosInstance.post('/auth/reset-password', data);
export const sendEmailApi = (email) => axiosInstance.post('/email/send', { email });
export const verifyEmailApi = (email, code) => axiosInstance.post('/email/verify', { email, code });
export const startTimerApi = () => axiosInstance.get('/timer/startTime');
export const stopTimerApi = () => axiosInstance.get('/timer/endTime');
export const getUserListApi = () => axiosInstance.get('/auth/list'); 
export const getTimerListApi = () => axiosInstance.get('/timer/list');

// ⭐ [추가됨] 공개/비공개 설정을 서버에 저장하는 API
// 엔드포인트(/auth/update)는 서버 명세에 맞춰 조정이 필요할 수 있습니다.
export const updateUserSettingsApi = (data) => axiosInstance.patch('/auth/update', data);

export default axiosInstance;