import axios from 'axios';

// 우리 팀 공통 Axios 인스턴스 생성
const apiClient = axios.create({
  // 백엔드 팀원이 알려준 대문 주소
  baseURL: 'http://localhost:8080', 
  // 응답 대기 시간 (5초)
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// [선택사항] 응답 인터셉터: 에러가 발생했을 때 공통적으로 처리하고 싶다면 추가하세요.
apiClient.interceptors.response.use(
  (response) => {
    // 서버 응답이 성공(200번대)일 때 바로 데이터만 리턴하게 할 수도 있습니다.
    return response;
  },
  (error) => {
    // 에러 발생 시 콘솔에 찍어주는 공통 로직
    console.error('API 통신 에러:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;