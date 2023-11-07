import React from 'react'

const TaskCard = ({taskId,task,task_no}) => {

  // const week = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const handleDelete = (taskId) =>{
    console.log(taskId);
  }

  return (
    <div className="task-card">
      <h3 id="task-heading">{`Task: ${task_no+1}`}</h3>
      <div className="task-info">
        <p className="task-key">Task : <span className="task-value">{task.task}</span></p>
        <p className="task-key">Completion Status : <span className="task-value">{task.completed? `True`: `False`}</span></p>
        <p className="task-key">Last updated On : <span className="task-value">{
          (task.updatedAt? 
            `${new Date(`${task.updatedAt}`).getDate()} 
             ${month[new Date(`${task.updatedAt}`).getMonth()]} 
             ${new Date(`${task.updatedAt}`).getFullYear()} At 
             ${new Date(`${task.updatedAt}`).getHours() > 12? new Date(`${task.updatedAt}`).getHours() - 12 : new Date(`${task.updatedAt}`).getHours()} : ${new Date(`${task.updatedAt}`).getMinutes()} 
             ${new Date(`${task.updatedAt}`).getHours() > 12? `PM`:`AM`}` 
          : `Not available`)
        }</span></p>
        <p className="task-key">Created On : <span className="task-value">{
          (task.createdAt? 
            `${new Date(`${task.createdAt}`).getDate()} 
             ${month[new Date(`${task.createdAt}`).getMonth()]} 
             ${new Date(`${task.createdAt}`).getFullYear()} At 
             ${new Date(`${task.createdAt}`).getHours() > 12? new Date(`${task.createdAt}`).getHours() - 12 : new Date(`${task.createdAt}`).getHours()} : ${new Date(`${task.createdAt}`).getMinutes()} 
             ${new Date(`${task.createdAt}`).getHours() > 12? `PM`:`AM`}` 
          : `Not available`)
        }</span></p>
      </div>

      <div className="btn-container">
        <button className='btn success'>update</button>
        <button className='btn danger' onClick={()=>{handleDelete(taskId)}}>delete</button>
      </div>

    </div>
  )
}

export default TaskCard