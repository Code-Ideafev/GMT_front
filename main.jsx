import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // 점 하나, 슬래시 하나! 정확히 이대로여야 합니다.

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);