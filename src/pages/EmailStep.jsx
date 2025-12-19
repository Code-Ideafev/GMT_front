import Input from './components/Input'; // 👈 여기도 추가!

export default function EmailStep({ email, setEmail, onNext }) {
  return (
    <form className="login-box" onSubmit={onNext}>
      <Input 
        type="email" 
        placeholder="학교 이메일을 입력하세요 (@gsm.hs.kr)" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">인증번호 받기</button>
    </form>
  );
}