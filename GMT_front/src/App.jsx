import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Timer from "./timer/timer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Timer />} />
        <Route path="/timer" element={<Timer />} />
      </Routes>
    </Router>
  );
}

export default App;
