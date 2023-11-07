import React, { useState, useEffect } from 'react'
import { isExpired,decodeToken } from "react-jwt"
import TaskCard from './TaskCard'

import { FaPlus, FaArrowDown } from "react-icons/fa"
import { useGlobalContext } from './context'
import Login from './Login'

const Home = () => {
  const {isLoggedIn,cookie,setUser,setIsLoggedIn} = useGlobalContext();
  const [userTasks,setUserTasks] = useState([])
  const [isCreating,setIsCreating] = useState(false)

  console.log("Inside Home comp");
  useEffect(() => {

    const getUserTasks = async () => {
      
      const tasks = await fetch(`http://localhost:5000/api/tasks`,{
        method:"GET",
        headers: {
          'Content-type': 'application/json',
          "authorization": `Bearer ${cookie.jwtToken}`
        }
      })

      const data = await tasks.json()
      return data.tasks;
    }


    if(cookie.jwtToken){
      const tokenInfo = decodeToken(cookie.jwtToken);
      const tokenExpiry = isExpired(cookie.jwtToken)
      console.log("Inside getUser function");
      if(tokenExpiry){
        setIsLoggedIn(false)
      } else {
        setUser({userName:tokenInfo.user, userId:tokenInfo.userID})
        getUserTasks().then(
          (data)=>{setUserTasks(data)}
        )
        setIsLoggedIn(true)
      }
    } else {
      setIsLoggedIn(false)
    }
  },[cookie,isCreating])

  if(isLoggedIn && !isCreating){
    return(
      <div className="home-main">
        <>          
          <h2 id="my-tasks">All Tasks <FaArrowDown className='arrow-down'/></h2>
          <div className="home-container">
            <div id="add-new-task" onClick={
              ()=>setIsCreating(true)
            }>
              <FaPlus 
              style={{
                fontSize:"1.7rem",
                marginBottom:"1rem"
              }}/>
              <h3>Add New Task</h3>
            </div>
            {userTasks.length>0 && userTasks.map((task,index)=>{
              return <TaskCard key={task._id} taskId={task._id} task={task} task_no={index} />
            })}
            
          </div>
        </>
      </div>
    )
  } else if(isLoggedIn && isCreating){
    return(
      <>
        <Editform setIsCreating={setIsCreating}/>
      </>
    )
  } else {
    return(
      cookie.jwtToken? isExpired(cookie.jwtToken)? <Login/> : <h1>Loading...</h1>  :
      <Login/>
    )
  }

}

const Editform = ({setIsCreating}) =>{

  const [newTask,setNewTask] = useState("");
  const {cookie} = useGlobalContext()

  const createTask = async (e) => {
    const newTsk = await fetch("http://localhost:5000/api/tasks",{
      method:"POST",
      headers: {
        'Content-type': 'application/json',
        "authorization": `Bearer ${cookie.jwtToken}`
      },
      body:JSON.stringify({
        task:newTask,
        completed: e.target[1].checked? true : false
      })
    })
    return newTsk;
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    
    if(newTask.trim() === ""){
      console.log("empty task");
    } else {
      try {
        createTask(e).then(()=>{
          console.log("handled submit")
        })
      } catch (err) {
        console.log(err);
      }
    }
    setIsCreating(false)
  }
  
  const handleRejection = (e) =>{
    setNewTask("")
    setIsCreating(false);
  }

  return(
    <div className="home-main">
      <form onSubmit={handleSubmit} className="edit-form">
        <div>
          <label htmlFor="task" className="key">Task : </label>
          <input type="text" className="value" value={newTask} onChange={(e)=>setNewTask(e.target.value)} />
        </div>
        <div>
          <label htmlFor="completed" className="key">Completed : </label>
          <div id='radio-option'>
            <div>
            <input type="radio" name="completed" value={true} id="true" />
            <label htmlFor="true">True</label>
            </div>
            <div>
            <input type="radio" name="completed" value={false} id="false" />
            <label htmlFor="false">False</label>
            </div>
          </div>
        </div>
        <div className="btn-container">
          <button type="button" className='btn danger' onClick={handleRejection}>Cancel</button>
          <button type='submit' className='btn success'>Create</button>
        </div>
      </form>
    </div>
  )
}



export default Home