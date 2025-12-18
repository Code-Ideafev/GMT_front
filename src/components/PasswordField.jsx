import { useState } from 'react';
import eyeOff from '../assets/images/eye off.svg';
import eye from '../assets/images/eye.svg';

export default function PasswordField({ id, placeholder }) {
  const [show, setShow] = useState(false);

  return (
    <div className="password-field">
      <input type={show ? 'text' : 'password'} id={id} placeholder={placeholder} />
      <img 
        src={show ? eye : eyeOff} 
        className="toggle-password" 
        onClick={() => setShow(!show)} 
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
}