import React,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from './context';

const Signup = () => {

  const { setUser,setIsLoggedIn } = useGlobalContext();
  const [userName,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register",{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({
          userName,
          password,
          confirmPassword
        })
      })
      const newUser = await res.json()
      setUser({userName , userId:newUser.user._id})

      setUserName("")
      setPassword("");
      setConfirmPassword("");

      setIsLoggedIn(true);
      navigate("/")

    } catch (err) {
      console.log(err)
    }
    setUserName("");
    setPassword("");
    setConfirmPassword("");
    
  }

  return (
    <div className='login-signup-form'>
    <form onSubmit={handleSubmit} className="form-main">
      <h3 className="form-heading">Sign Up</h3>
      <div className="form-unit">
        <label htmlFor="username">Username</label>
        <input type="text" value={userName} onChange={(e)=> setUserName(e.target.value)}/>
      </div>
      <div className="form-unit">
        <label htmlFor="password">Password</label>
        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
      </div>
      <div className="form-unit">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />
      </div>
      <input id='submit-btn' type="submit" value="Sign Up" />
      <Link to="/login" id="go-to">Login</Link>
    </form>
  </div>
  )
}

export default Signup