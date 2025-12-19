import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Input from './Input';

export default function PasswordField({ id, placeholder }) {
  const [show, setShow] = useState(false);

  return (
    <div className="password-field">
      {/* 원래 <input> 대신 대문자 <Input>을 씁니다 */}
      <Input 
        type={show ? 'text' : 'password'} 
        id={id} 
        placeholder={placeholder} 
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