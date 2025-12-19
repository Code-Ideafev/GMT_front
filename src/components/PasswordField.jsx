import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Input from './Inputtype';

export default function PasswordField({ id, placeholder, value, onChange }) {
  const [show, setShow] = useState(false);

  return (
    <div className="password-field">
      <Input 
        type={show ? 'text' : 'password'} 
        id={id} 
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
      />
      
      <div className="toggle-password" onClick={() => setShow(!show)}>
        {show ? <Eye size={20} color="#ababab" /> : <EyeOff size={20} color="#ababab" />}
      </div>
    </div>
  );
}