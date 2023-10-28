import React from 'react'
import {Link} from "react-router-dom"
import {FaUser} from "react-icons/fa"

import { useGlobalContext } from './context'


const Navbar = () => {
  const {isLoggedIn,user,setIsLoggedIn} = useGlobalContext();

  return (
    <header className="navbar">
        <div className="Logo">
            <h2>MyTasks</h2>
        </div>
        {!isLoggedIn &&        
          <div className="nav-links">
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign up</Link>
          </div> 
        }
        {isLoggedIn &&
          <div className="user-links">
            <FaUser id="user-img"/>
            <h3 id="user-name">{user.userName}</h3>
            <Link to="/" id='log-out' onClick={()=>setIsLoggedIn(false)}>Log Out</Link>
          </div>

        }

    </header>
  )
}

export default Navbar