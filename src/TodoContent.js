import { useRef } from 'react'
import './TodoContent.css'

const TodoContent = ({newTask, setNewTask, addTask}) => {

    const inputRef = useRef()
    
    return (
        <div className="container">
            <div className='inputarea'>
                <form onSubmit={addTask}>
                    <div className="intputBox">
                        
                        <input 
                            autoFocus
                            ref={inputRef}
                            autoComplete='off'
                            id = "todoInput"
                            type = "text"
                            placeholder = "To Do"
                            tabIndex = {0}
                            required
                            value = {newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                    
                        <button 
                            type = 'submit'
                            onClick={() => inputRef.current.focus()}
                        >Add</button>
                    </div>
                </form>
            </div>
            <div>
                
            </div>

        </div>
    )
}

export default TodoContent