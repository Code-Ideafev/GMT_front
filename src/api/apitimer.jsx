import axios from 'axios';

// 1. 팀원이 만든 공통 Axios 인스턴스
const apiClient = axios.create({
  baseURL: 'http://localhost:8080', 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 인터셉터 (팀원 코드)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API 통신 에러:', error.response || error.message);
    return Promise.reject(error);
  }
);

/**
 * 2. 타이머 시작 API (GET /timer/startTime)
 */
export const startTimerApi = async () => {
  const token = localStorage.getItem('accessToken'); 

  try {
    const response = await apiClient.get('/timer/startTime', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 3. 타이머 종료 API (GET /timer/endTime)
 */
export const stopTimerApi = async () => {
  const token = localStorage.getItem('accessToken');

  try {
    const response = await apiClient.get('/timer/endTime', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;