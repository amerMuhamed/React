import React, { useEffect, useState } from 'react'
import './Timmer.css'
const Timmer = () => {
const [count,setCount]=useState(0);
const[isRunning,setisRunning]=useState(false) 
 useEffect(()=>{
    let interval;
    if(isRunning){
        interval= setInterval(()=>{
        setCount(prevCount=>prevCount+1)
        },1000 )
        return ()=>clearInterval(interval);
    }
 },[isRunning])
 const toggelRunning=()=>{
    setisRunning(prevIsRunning=>!prevIsRunning)
 }

  return (
    <>
    <h1>Timmer</h1>
      <div className="tim">

        <h1>{count}</h1>
        <div className='one '><button className='btn  btn-primary' onClick={toggelRunning}>Timmer</button></div>
      </div>
    </>
  )
}

export default Timmer
