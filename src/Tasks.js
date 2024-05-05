import React from "react";
import { FaTrash  } from "react-icons/fa";
import './TodoContent.css'


const Task = ({tasks, HandleChecked, HandleDelete}) => {
    
    return(
        <ul className="container">
            {
                tasks.map((task) => (
                    <li className='eachTask' key={task.id}>
                        <input
                            type = "checkBox"
                            checked = {task.checked}
                            onChange={() => HandleChecked(task.id)}
                        />
                        <label 
                            className="task"
                            style={(task.checked)?{textDecoration: 'line-through',color: 'grey'}:null}
                        >
                            {task.task}
                        </label>
                        <FaTrash 
                            className="trash"
                            onClick={() => HandleDelete(task.id)}
                        />
                    </li>
                ))
            }
        </ul>
    )
}

export default Task