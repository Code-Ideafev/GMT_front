import axios from 'axios';

// 1. axios 인스턴스 기본 설정
const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.148:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. 토큰이 필요 없는 API 목록 (로그인 전 사용되는 기능들)
const NO_AUTH_URLS = [
  '/auth/join',
  '/auth/login',
  '/auth/reset-password',
  '/email/send',
  '/email/verify',
];

// 3. 요청 인터셉터: 서버로 데이터를 보내기 전 실행
axiosInstance.interceptors.request.use(
  (config) => {
    // URL이 목록에 포함되어 있는지 확인 (startsWith를 사용하여 더 정확하게 체크)
    const isNoAuth = NO_AUTH_URLS.some(url => config.url?.startsWith(url));

    if (isNoAuth) {
      // 💡 핵심 수정: 토큰이 필요 없는 요청은 Authorization 헤더를 아예 제거해서 403 에러를 방지합니다.
      delete config.headers.Authorization;
      console.log(`🔓 인증 미필요 요청: ${config.url}`);
      return config;
    }

    // 그 외 요청은 로컬 스토리지에서 토큰을 가져와 헤더에 삽입
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ 토큰 주입 성공');
    } else {
      console.warn('⚠️ 토큰 없음: 로그인이 필요한 서비스입니다.');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 4. 응답 인터셉터: 서버에서 결과를 받은 후 실행
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 403 에러 발생 시 상세 로그 출력
    if (error.response?.status === 403) {
      console.error('❌ 403 에러: 서버에서 접근 권한이 없다고 판단했습니다. (URL 확인 필요)');
    }
    console.error(
      '❌ API 에러:',
      error.response?.status,
      error.response?.data
    );
    return Promise.reject(error);
  }
);

// ==================== API 함수 모음 ====================

// 🔐 인증 및 회원가입 관련
export const signUpApi = (data) => 
  axiosInstance.post('/auth/join', data);

export const loginApi = (data) => 
  axiosInstance.post('/auth/login', data);

export const resetPasswordApi = (data) => 
  axiosInstance.post('/auth/reset-password', data);

// 📧 이메일 인증 관련 (비밀번호 재설정 등에 사용)
export const sendEmailApi = (email) => 
  axiosInstance.post('/email/send', { email });

export const verifyEmailApi = (email, code) => 
  axiosInstance.post('/email/verify', { email, code });

// ⏱ 타이머 및 기록 관련
export const startTimerApi = () => 
  axiosInstance.get('/timer/startTime');

export const stopTimerApi = () => 
  axiosInstance.get('/timer/endTime');

export const getTimerListApi = () => 
  axiosInstance.get('/timer/list');

// 👤 유저 정보 관리 관련
export const getUserListApi = () => 
  axiosInstance.get('/auth/list');

export const updateProfileApi = (imageUrl) =>
  axiosInstance.post('/user/profile', {
    profileImageUrl: imageUrl,
  });

export default axiosInstance;