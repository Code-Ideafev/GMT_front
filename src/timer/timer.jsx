import React, {useEffect,useState} from 'react';


function Timer(){
    const [sec,setSec] = useState(0);

    useEffect(()=>{
    const timer = setInterval(()=>{
        setSec(prev => prev+1);
    },1000); 
  
    return () => {
        clearInterval(timer);
    };
    },[]);

    return (
        <>
        <p>시작하기</p>
          <p>{sec}초</p>
        </>
    );
}


export default Timer;