import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Timer from "./Timer/Timer"; 
import Login from './pages/Login';
import MyPage from "./MyPage/my-page";
import EditProfilePage from "./MyPage/EditProfilePage"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/EditProfile" element={<EditProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}