import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.18:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔹 토큰 필요 없는 API 목록
const NO_AUTH_URLS = [
  '/auth/join',
  '/auth/login',
  '/auth/reset-password',
  '/email/send',
  '/email/verify',
];

// ✅ 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // 토큰이 필요 없는 요청이면 그냥 보냄
    if (NO_AUTH_URLS.includes(config.url)) {
      return config;
    }

    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ 토큰 주입 성공');
    } else {
      console.warn('⚠️ 토큰 없음: accessToken 확인 필요');
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      '❌ API 에러:',
      error.response?.status,
      error.response?.data
    );
    return Promise.reject(error);
  }
);

// ==================== API 함수 ====================

// 🔐 인증 관련
export const signUpApi = (data) =>
  axiosInstance.post('/auth/join', data);

export const loginApi = (data) =>
  axiosInstance.post('/auth/login', data);

export const resetPasswordApi = (data) =>
  axiosInstance.post('/auth/reset-password', data);

// 📧 이메일 인증
export const sendEmailApi = (email) =>
  axiosInstance.post('/email/send', { email });

export const verifyEmailApi = (email, code) =>
  axiosInstance.post('/email/verify', { email, code });

// ⏱ 타이머
export const startTimerApi = () =>
  axiosInstance.get('/timer/startTime');

export const stopTimerApi = () =>
  axiosInstance.get('/timer/endTime');

export const getTimerListApi = () =>
  axiosInstance.get('/timer/list');

// 👤 유저
export const getUserListApi = () =>
  axiosInstance.get('/auth/list');

export const updateProfileApi = (imageUrl) =>
  axiosInstance.post('/user/profile', {
    profileImageUrl: imageUrl,
  });

export default axiosInstance;
