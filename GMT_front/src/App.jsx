import React from "react";
import { Routes, Route } from "react-router-dom";

import Timer from "./timer/timer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Timer />} />
      <Route path="/timer" element={<Timer />} />
    </Routes>
  );
}

export default App;