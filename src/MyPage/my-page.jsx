import "./my-page.css";
import clockIcon from "./Vector.svg";

export default function MyPage() {
  return (
    <div className="mypage-container">
      <div className="header-area">
        {/* wrapper로 감싸줘야 시계 밑에 글씨가 옵니다 */}
        <div className="icon-wrapper">
          <button className="icon-button">
            <img src={clockIcon} alt="history" />
          </button>
          <span className="back-text">돌아가기</span>
        </div>
      </div>
    </div>
  );
}