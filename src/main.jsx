import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' 
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 친구가 추가한 BrowserRouter가 있어야 페이지 이동이 가능합니다 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)