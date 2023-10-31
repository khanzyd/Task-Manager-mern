import React, { useState, useEffect } from 'react'
import TaskCard from './TaskCard'

import { FaPlus, FaArrowDown } from "react-icons/fa"
import { useGlobalContext } from './context'
import Login from './Login'

const Home = () => {
  
  const {isLoggedIn,user} = useGlobalContext();
  const [userTasks,setUserTasks] = useState([])
  
  const getUserTasks = async (user) => {
    const tasks = await fetch(`http://localhost:5000/api/tasks`,{
      method:"GET",
      headers: {
        'Content-type': 'application/json',
        "authorization": `Bearer ${user.token}`
      }
    })

    let t = await tasks.json()
    setUserTasks(t.tasks)
    console.log(t.tasks[0].updatedAt);
  }

  useEffect(() => {
    if(user){
      getUserTasks(user)
    }
  },[user]) 


  return (
    <div className="home-main">
      
      {!isLoggedIn && <Login/>}

      {isLoggedIn && 
        <>          
          <h2 id="my-tasks">All Tasks <FaArrowDown className='arrow-down'/></h2>
          <div className="home-container">
            <div id="add-new-task">
              <FaPlus 
              style={{
                fontSize:"1.7rem",
                marginBottom:"1rem"
              }}/>
              <h3>Add New Task</h3>
            </div>
            {userTasks.map((task,index)=>{
              return <TaskCard key={task._id} task={task} task_no={index} />
            })}
            
          </div>
        </>
      }
    </div>

  )
}

export default Home