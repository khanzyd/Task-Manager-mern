import React from 'react'
import TaskCard from './TaskCard'

import { FaPlus, FaArrowDown } from "react-icons/fa"
import { useGlobalContext } from './context'
import Login from './Login'

const Home = () => {
  const {isLoggedIn} = useGlobalContext();
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
            <TaskCard/>
          </div>
        </>
      }
    </div>

  )
}

export default Home