import React, { useState } from 'react'
import './Theme.css'
const Theme = () => {
    const[theme,setTheme]=useState('light')
    const toggleTheme=()=>{
setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }
  return (
    <div style={ {height:"150px",backgroundColor: theme === 'light'? '#fff':"#333"}}>
           <button className="toggle-btn btn-primary" onClick={toggleTheme}>
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
            </button>
    </div>
  )
}

export default Theme
