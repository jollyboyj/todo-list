import './App.css';
import TodoContent from './TodoContent'
import Header from './Header'
import Task from './Tasks';
import { useState } from 'react';

function App() {

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("to_doList"))
  )

  const [newTask, setNewTask] = useState('')

    const addTask = (e) => {
        e.preventDefault()
        addNewTask(newTask)
        setNewTask('')
    }
    const addNewTask = (task) => {
        const id = tasks.length ? tasks[tasks.length -1].id +1 : 1;
        const newTask = {id,checked:false,task}
        const addNewTask = [...tasks, newTask]
        setTasks(addNewTask)
        localStorage.setItem("to_doList",JSON.stringify(addNewTask))
      }

      const HandleChecked = (id) => {
        const updateTask = tasks.map((task) => (
          task.id===id?{...task, checked: !task.checked}:task
        ))
        setTasks(updateTask)
        localStorage.setItem("to_doList",JSON.stringify(updateTask))
      }

      const HandleDelete = (id) => {
        const updateTask = tasks.filter((task) => (
          task.id!==id))
        setTasks(updateTask)
        localStorage.setItem("to_doList",JSON.stringify(updateTask))
      }

  return (
    <div className="App-header">
      <Header />
      <TodoContent 
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />
      {tasks.length? (
      <Task
        tasks = {tasks}
        setTasks = {setTasks}
        HandleChecked={HandleChecked}
        HandleDelete = {HandleDelete}
      />
      ) : (
        <p>No Task to Do</p>
      )}
    </div>
  );
}

export default App;
