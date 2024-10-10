import React, { useState, useEffect } from "react";

function EffectTimer() {
  const [countdown, setCountdow] = useState(2000);
  useEffect(() => {
    const timerId=setInterval(() => {
      setCountdow(prevState => prevState - (1));
    }, 1000)
    return()=>clearInterval(timerId)
  }, []);
  return (
    <div>
      <h1>{countdown}</h1>
    </div>
  );
}

export default EffectTimer;
