import React from 'react';

export default function Input({ type = "text", placeholder, value, onChange, id, ...props }) {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="custom-input" // 공통 스타일을 위한 클래스
      {...props} // 나머지 설정(onBlur, onFocus 등)을 한 번에 전달
    />
  );
}