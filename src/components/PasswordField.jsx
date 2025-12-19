import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Input from './Inputtype';

// 1. props 부분에 value와 onChange를 꼭 추가해서 받아야 합니다!
export default function PasswordField({ id, placeholder, value, onChange }) {
  const [show, setShow] = useState(false);

  return (
    <div className="password-field">
      <Input 
        type={show ? 'text' : 'password'} 
        id={id} 
        placeholder={placeholder} 
        // 2. 부모한테 받은 value와 onChange를 여기에 연결해줍니다.
        value={value}
        onChange={onChange}
      />
      
      <div 
        className="toggle-password" 
        onClick={() => setShow(!show)}
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