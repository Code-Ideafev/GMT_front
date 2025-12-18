import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Timer from "./timer/timer.jsx";

function App(){
  const [showTimer,setShowTimer] = useState(false);

  return (
    <div>

     <img src="/ccd5aa1de7d311728c1c9d56de3c9eebf4eb872a.png" alt="이미지"/>
      <h1>GMT Timer</h1>
    {showTimer && <timer />}
    <button
     onClick={()=>{
      setShowTimer(!showTimer);
     }}
      > 
      Toolgle Button
      </button>  
      </div>
  )
}

export default App;
