import { useState } from 'react';

// 1. 이미지 대신 라이브러리 아이콘을 불러옵니다.
import { Eye, EyeOff } from 'lucide-react'; 

export default function PasswordField({ id, placeholder }) {
  const [show, setShow] = useState(false);

  return (
    <div className="password-field">
      <input 
        type={show ? 'text' : 'password'} 
        id={id} 
        placeholder={placeholder} 
      />
      
      {/* 2. img 태그 대신 아이콘 컴포넌트를 사용합니다. */}
      <div 
        className="toggle-password" 
        onClick={() => setShow(!show)}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        {show ? (
          <Eye size={20} color="#ababab" />
        ) : (
          <EyeOff size={20} color="#ababab" />
        )}
      </div>
    </div>
  );
}