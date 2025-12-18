import { Routes, Route } from 'react-router-dom';
import Timer from './timer/Timer.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Timer />} />
    </Routes>
  );
}
