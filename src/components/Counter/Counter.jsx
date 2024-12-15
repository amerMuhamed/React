import "./Counter.css";
import React, { useState } from 'react'

const Counter = () => {
    const [count,setCount]=useState(0);


      const increament=()=>{
          setCount((prevCount)=>prevCount+1);
      }
        const decreament=()=>{
          setCount((prevCount)=>prevCount-1);}
    return (  
    <>
    <h1>counter</h1>
      <div className="count ">
<button className='btn btn-primary ' onClick={increament}>increament</button>
<button className='btn tow btn-primary ' onClick={decreament}>decreament</button>
<div className=" counter">
{count}
</div>
      </div>
    </>
  )
}

export default Counter;
