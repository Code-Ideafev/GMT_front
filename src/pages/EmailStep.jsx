import { useState } from "react";
import Input from "../components/Inputtype";
import { sendEmailApi } from "../utils/axiosInstance"; 
import { useNavigate } from "react-router-dom";

export default function EmailStep({ email, setEmail, onNext }) {
  const [emailId, setEmailId] = useState(""); // 아이디 입력값만 관리
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    
    if (!emailId) {
      setErrorMessage("아이디를 입력해주세요.");
      return;
    }

    // 💡 사용자가 입력한 아이디 뒤에 서버가 요구하는 도메인을 자동으로 결합
    const fullEmail = `${emailId}@gsm.hs.kr`;

    setIsLoading(true);
    try {
      await sendEmailApi(fullEmail);
      setEmail(fullEmail); // 부모 상태 업데이트
      alert("인증번호가 발송되었습니다.");
      onNext(); 
    } catch (error) {
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
      <div style={{ marginBottom: "15px", textAlign: "left", width: "100%", position: 'relative' }}>
        <Input 
          type="text" 
          placeholder="학교 아이디 입력" 
          value={emailId}
          // 💡 사용자가 직접 @를 입력하더라도 자동으로 잘라내어 아이디만 유지함
          onChange={(e) => {
            const value = e.target.value.split('@')[0];
            setEmailId(value);
          }}
          style={{ paddingRight: '100px' }}
        />
        {/* 우측에 @gsm.hs.kr 고정 표시 */}
        <span style={{ 
          position: 'absolute', 
          right: '15px', 
          top: '30px', /* Input 높이에 맞춰 위치 조정 */
          transform: 'translateY(-50%)', 
          color: '#aaa', 
          fontSize: '14px', 
          pointerEvents: 'none' 
        }}>
          @gsm.hs.kr
        </span>

        {errorMessage && (
          <div style={{ color: "#ff4d4d", fontSize: "12px", marginTop: "10px", textAlign: "center", lineHeight: "1.6" }}>
            {errorMessage}
            <br />
            <span 
              style={{ textDecoration: 'underline', cursor: 'pointer', color: '#ff4d4d', fontWeight: 'bold' }}
              onClick={() => navigate('/Signup')} // Signup 스펠링 주의 (Singup -> Signup)
            >
              회원가입 하러 가기
            </span>
          </div>
        )}
      </div>
      <button type="submit" disabled={isLoading} className="submit-btn">
        {isLoading ? "발송 중..." : "인증번호 받기"}
      </button>
    </form>
  );
}