// src/utils/axiosInstance.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// 명세서 이미지 기반 수정
export const loginApi = (data) => api.post('/user/login', data); // /login -> /user/login
export const signUpApi = (data) => api.post('/user/join', data); // 회원가입 경로 추가

const handleFinish = async (newPassword) => {
  try {
    const response = await resetPasswordApi({
      // 서버가 'userEmail', 'pwd'라는 이름을 원한다면 그대로 맞춰줘야 함!
      userEmail: email, 
      pwd: newPassword 
    });
    // ... 성공 처리
  } catch (error) {
    // ... 에러 처리
  }
};

export default api;