import { useState } from "react";
import Input from "../components/Inputtype";
import { sendEmailApi } from "../utils/axiosInstance"; 
import { useNavigate } from "react-router-dom";

export default function EmailStep({ email, setEmail, onNext }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    
    if (!email.endsWith("@gsm.hs.kr")) {
      setErrorMessage("학교 이메일(@gsm.hs.kr) 형식을 확인해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      await sendEmailApi(email);
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
      
      <div style={{ marginBottom: "15px", textAlign: "left", width: "100%" }}>
        <Input 
          list="reset-email-options"
          placeholder="학교 이메일을 입력하세요 (@gsm.hs.kr)" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <datalist id="reset-email-options">
          {email && !email.includes('@') && <option value={`${email}@gsm.hs.kr`} />}
        </datalist>

        {errorMessage && (
          <div style={{ color: "#ff4d4d", fontSize: "12px", marginTop: "10px", textAlign: "center", lineHeight: "1.6" }}>
            {errorMessage}
            <br />
            <span 
              style={{ textDecoration: 'underline', cursor: 'pointer', color: '#ff4d4d', fontWeight: 'bold' }}
              onClick={() => navigate('/Singup')}
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