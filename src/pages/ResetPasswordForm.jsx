import { useState, useEffect } from 'react';
import EmailStep from './EmailStep';
import VerifyStep from './VerifyStep';
import NewPasswordStep from './NewPasswordStep';
import './ResetPassword.css';

export default function ResetPasswordForm({ onBack }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    if (step === 2 && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && step === 2) {
      alert("인증 시간이 만료되었습니다.");
      setStep(1);
    }
  }, [step, timeLeft]);

  const formatTime = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2, '0')}`;

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z0-9._%+-]+@gsm\.hs\.kr$/.test(email)) {
      return alert("학교 공식 이메일(@gsm.hs.kr)만 사용 가능합니다.");
    }
    alert('인증번호 발송!');
    setTimeLeft(180);
    setStep(2);
  };

  return (
    <div id="resetPasswordContainer">
      <div className="welcome-text">비밀번호 재설정</div>

      {step === 1 && <EmailStep email={email} setEmail={setEmail} onNext={handleSendCode} />}
      
      {step === 2 && (
        <VerifyStep 
          authCode={authCode} setAuthCode={setAuthCode} 
          timeLeft={timeLeft} formatTime={formatTime} 
          onNext={(e) => { e.preventDefault(); setStep(3); }} 
          onResend={() => setTimeLeft(180)} 
        />
      )}
      
      {step === 3 && <NewPasswordStep onFinish={() => { alert('변경 완료!'); onBack(); }} />}

    </div>
  );
}