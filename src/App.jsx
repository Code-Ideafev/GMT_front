import Timer from './Timer/Timer.jsx';
import logo from './assets/img/ccd5aa1de7d311728c1c9d56de3c9eebf4eb872a.png';



function App() {
  return (
    <div style={{ position: 'relative', height: '100vh', padding: '20px' }}>
      <img 
        src={logo} 
        alt="GMT Logo" 
        style={{ position: 'absolute', top: '20px', left: '20px', width: '100px' }}
      />
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Timer />
      </div>
    </div>
  );
}

export default App;
