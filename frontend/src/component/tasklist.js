import React from "react"
import API from "../service/api"

function TaskList({tasks, fetchTasks}){
    

    const deleteTask = async (id) =>{
        toast.success("Task deleted!")

        await API.delete(`/${id}`)
        fetchTasks()
    }
    const toggleComplete = async(task) =>{
        toast.success("Task updated!")  
        await API.put(`/${task._id}`,{completed : !task.completed})
        fetchTasks()
    }
    return (
  <div>
    {tasks.map((task) => (
      <div className="task" key={task._id}>
        
        <span
          onClick={() => toggleComplete(task)}
          style={{
            textDecoration: task.completed ? "line-through" : "none"
          }}
        >
          {task.title}
        </span>

        <button
          className="delete-btn"
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>

      </div>
    ))}
  </div>
)
}
export default TaskList