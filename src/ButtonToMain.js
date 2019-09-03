import React from 'react';
import { Link } from 'react-router-dom'

function ButtonToMain() {
  return (
    <Link to='/'>
      <button className="close-search">Close</button> 
    </Link>  
  )
}

export default ButtonToMain;