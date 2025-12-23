import { useState } from "react";
import Input from "../components/Inputtype";
import { sendEmailApi } from "../utils/axiosInstance"; // utils 폴더의 함수 호출
import { useNavigate } from "react-router-dom";

export default function EmailStep({ email, setEmail, onNext }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    
    // 이메일 형식 체크
    if (!email.endsWith("@gsm.hs.kr")) {
      setErrorMessage("학교 이메일(@gsm.hs.kr) 형식을 확인해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      // 1. 백엔드에 이메일 인증번호 발송 요청
      await sendEmailApi(email);
      alert("인증번호가 발송되었습니다.");
      onNext(); // 다음 단계(인증번호 입력창)로 이동
      
    } catch (error) {
      // 2. 등록되지 않은 사용자인 경우 처리 (백엔드가 404를 준다고 가정)
      if (error.response && error.response.status === 404) {
        setErrorMessage("등록되어 있지 않은 사용자입니다. 회원가입 후 이용해주세요.");
      } else {
        setErrorMessage("서버 통신에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="login-box" onSubmit={handleSubmit}>
      <div style={{ marginBottom: "15px", textAlign: "left", width: "100%" }}>
        <Input 
          type="email" 
          placeholder="학교 이메일을 입력하세요 (@gsm.hs.kr)" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        {/* ⭐ 경고 문구 및 회원가입 링크 표시 */}
        {errorMessage && (
          <div style={errorTextStyle}>
            {errorMessage}
            <br />
            <span 
              style={{ textDecoration: 'underline', cursor: 'pointer', color: '#ff4d4d', fontWeight: 'bold' }}
              onClick={() => navigate('/signup')}
            >
              회원가입 하러 가기
            </span>
          </div>
        )}
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "발송 중..." : "인증번호 받기"}
      </button>
    </form>
  );
}

const errorTextStyle = {
  color: "#ff4d4d",
  fontSize: "12px",
  marginTop: "10px",
  textAlign: "center",
  lineHeight: "1.6"
};