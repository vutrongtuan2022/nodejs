import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import AllMemo from '../AllMemo/AllMemo'

function LayoutEffect() {
    const[count,setCount]=useState(1)
    // useLayoutEffect(()=>{
    //     if(count>3){
    //         setCount(0)
    //     }
    // },[count])
   
const handleState=useCallback(()=>{
    setCount(count=>count+1)
},[])
  return (
    <div>
        <AllMemo onIncrease={handleState}/>
        <h1>{count}</h1>
        {/* <button onClick={handleState}>Run</button> */}
    </div>
  )
}

export default LayoutEffect