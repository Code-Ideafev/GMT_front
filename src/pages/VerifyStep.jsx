export default function VerifyStep({ authCode, setAuthCode, timeLeft, formatTime, onNext, onResend }) {
  return (
    <form className="login-box" onSubmit={onNext}>
      <div className="info-text">이메일로 전송된 번호를 입력해주세요.</div>
      <div className="input-wrapper">
        <input 
          type="text" 
          placeholder="인증번호 6자리" 
          value={authCode}
          onChange={(e) => setAuthCode(e.target.value)}
        />
        <span className="timer">{formatTime(timeLeft)}</span>
      </div>
      <button type="submit">인증번호 확인</button>
      <div className="resend-link" onClick={onResend}>인증번호 다시 받기</div>
    </form>
  );
}