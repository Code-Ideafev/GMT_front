import React from 'react';
import styles from './Inputtype.module.css';

export default function Input({ type = "text", placeholder, value, onChange, id, ...props }) {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={styles.customInput} 
      {...props}
    />
  );
}