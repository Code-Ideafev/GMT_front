import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPage from "./MyPage/my-page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/MyPage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
