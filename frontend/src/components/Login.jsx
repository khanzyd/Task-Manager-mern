import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGlobalContext } from './context';

function Login() {

  const [userName,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const { setIsLoggedIn,setUser } = useGlobalContext();
  const location = useLocation();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      let res = await fetch("http://localhost:5000/api/auth/login",{
        method:"POST",
        headers: {
          'Content-type': 'application/json'
        },
        body:JSON.stringify({
          userName,
          password
        })
      });
      let data = await res.json();

      setUser({userName, userId:data.user._id})
      setIsLoggedIn(true);
      if(location.pathname === "/login"){
        navigate("/")
      }
      setUserName("")
      setPassword("")
    }
    catch(err){
      console.log(err);
    }
    setUserName("")
    setPassword("")

  }

  return (
    <div className='login-signup-form'>
      <form onSubmit={handleSubmit} className="form-main">
        <h3 className="form-heading">Login</h3>
        <div className="form-unit">
          <label htmlFor="userName">Username</label>
          <input type="text" value={userName} onChange={(e)=>{setUserName(e.target.value)}} />
        </div>
        <div className="form-unit">
          <label htmlFor="password">Password</label>
          <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        <input id='submit-btn' type="submit" value="login" />
        <Link to="/signup" id="go-to">Sign Up</Link>
      </form>
    </div>
  )
}

export default Login