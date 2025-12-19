import React from 'react';
import styles from './Inputtype.module.css'; // CSS 모듈 불러오기

export default function Input({ type = "text", placeholder, value, onChange, id, ...props }) {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={styles.customInput} // 불러온 스타일 적용
      {...props}
    />
  );
}