import React from 'react';
import './StudyRecordCard.css';

const StudyRecordCard = ({ time, date }) => {
  return (
    <div className="study-record-card">
      <div className="card-left">
        {/* 젤 왼쪽 회색 동그라미 */}
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="30" fill="#D9D9D9"/>
        </svg>

        {/* 이름이 들어갈 동그라미 세 개 부분 */}
        <svg xmlns="http://www.w3.org/2000/svg" width="94" height="24" viewBox="0 0 94 24" fill="none" className="name-circles">
          <path d="M11.75 22.75C17.8251 22.75 22.75 17.8251 22.75 11.75C22.75 5.67487 17.8251 0.75 11.75 0.75C5.67487 0.75 0.75 5.67487 0.75 11.75C0.75 17.8251 5.67487 22.75 11.75 22.75Z" stroke="black" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M81.75 22.75C87.8251 22.75 92.75 17.8251 92.75 11.75C92.75 5.67487 87.8251 0.75 81.75 0.75C75.6749 0.75 70.75 5.67487 70.75 11.75C70.75 17.8251 75.6749 22.75 81.75 22.75Z" stroke="black" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M45.9335 22.75C52.0087 22.75 56.9335 17.8251 56.9335 11.75C56.9335 5.67487 52.0087 0.75 45.9335 0.75C39.8584 0.75 34.9335 5.67487 34.9335 11.75C34.9335 17.8251 39.8584 22.75 45.9335 22.75Z" stroke="black" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      </div>

      <div className="card-right">
        {/* 누적 시간과 날짜 */}
        <span className="record-time">{time}</span>
        <span className="record-date">{date}</span>
      </div>
    </div>
  );
};

export default StudyRecordCard;