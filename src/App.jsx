import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Timer from "./Timer/Timer";
import Login from './pages/Login';
import MyPage from "./MyPage/my-page";
import EditProfilePage from "./MyPage/EditProfilePage"; 
import Singupfrom from './pages/Singupfrom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/EditProfile" element={<EditProfilePage />} />
        <Route path='/Singup' element={<Singupfrom />} />
      </Routes>
    </BrowserRouter>
  );
}

