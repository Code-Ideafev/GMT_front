import React, { useEffect, useState } from 'react';

// 이미지 경로는 실제 파일 이름과 정확히 일치해야 함
import logo from '../assets/img/GMT.png';
import myIcon from '../assets/img/Group91.svg';
import leafIcon from '../assets/img/Group72.svg';

export default function Timer() {
  const [sec, setSec] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // 시간 포맷 함수
  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  // 타이머 동작
  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => setSec((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isActive]);

  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif', paddingTop: '50px' }}>
      <img src={logo} alt="GMT" style={{ width: '150px', marginBottom: '20px' }} />

      <div>
        <img src={myIcon} alt="Profile" style={{ width: '40px', borderRadius: '50%', verticalAlign: 'middle' }} />
        <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>MY</span>
      </div>

      <h1 style={{ fontSize: '50px', color: '#7DBA7D', margin: '40px 0' }}>{formatTime(sec)}</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {sec === 0 && !isActive && (
          <button onClick={() => setIsActive(true)} style={{ padding: '10px 20px', fontSize: '18px' }}>
            시작하기
          </button>
        )}
        {isActive && (
          <button onClick={() => setIsActive(false)} style={{ padding: '10px 20px', fontSize: '18px' }}>
            멈추기
          </button>
        )}
        {!isActive && sec > 0 && (
          <>
            <button onClick={() => setIsActive(true)} style={{ padding: '10px 20px', fontSize: '18px' }}>
              계속하기
            </button>
            <button
              onClick={() => setSec(0)}
              style={{ padding: '10px 20px', fontSize: '18px', backgroundColor: '#f55', color: '#fff' }}
            >
              끝내기
            </button>
          </>
        )}
      </div>

      {/* 테스트용 작은 아이콘 */}
      <img src={leafIcon} alt="Leaf" style={{ width: '40px', marginTop: '30px' }} />
    </div>
  );
}



