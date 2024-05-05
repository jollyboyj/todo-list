import './App.css';
import TodoContent from './TodoContent'
import Header from './Header'
import Task from './Tasks';
import Search from './Search'
import { useEffect, useState } from 'react';
import apiRequest from './apiRequest';

function App() {

  const API_URL = "http://localhost:3500/tasks"
  const [tasks, setTasks] = useState([])

  const [newTask, setNewTask] = useState('')
  const [search, setSearch] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    const fetchTasks = async () => {
      try{

        const response = await fetch(API_URL)
        if(!response.ok) throw Error ("Data Not Recieved")
        const listTasks = await response.json()
        console.log(listTasks)
        setTasks(listTasks)
      }catch(err){
        setFetchError(err.message)
      }finally{
        setLoading(false)
      }
    }
    setTimeout(()=>{
      (async () => await fetchTasks())()
    },2000)
    
  },[])


    const addTask = (e) => {
        e.preventDefault()
        addNewTask(newTask)
        setNewTask('')
    }
    const addNewTask = async (task) => {
        const id = (tasks.length ? parseInt(tasks[tasks.length -1].id) +1 : 1).toString();
        const newTask = {id,checked:false,task}
        const addNewTask = [...tasks, newTask]
        setTasks(addNewTask)

        const postObject = {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newTask)
        }

        const result = await apiRequest(API_URL,postObject)
        if(result) setFetchError(result)
        
      }

      const HandleChecked = async (id) => {
        const updateTask = tasks.map((task) => (
          task.id===id?{...task, checked: !task.checked}:task
        ))
        setTasks(updateTask)

        const myTask = updateTask.filter((task) => task.id===id)
        const patchObject = {
          method: 'PATCH',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({checked:myTask[0].checked})
        }
        const reqUrl = `${API_URL}/${id}`
        const result1 = await apiRequest(reqUrl, patchObject)
        if(result1) setFetchError(result1)
      }

      const HandleDelete = async (id) => {
        const updateTask = tasks.filter((task) => (
          task.id!==id))
        setTasks(updateTask)

        const deleteObject = {
          method: 'DELETE'}
        const reqUrl = `${API_URL}/${id}`
        const result2 = await apiRequest(reqUrl, deleteObject)
        if(result2) setFetchError(result2)
      }

  return (
    <div className="App-header">
      <Header />
      <TodoContent 
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />

      <Search 
        Search={Search}
        setSearch={setSearch}
      />
      <main>
        {loading && <p>Loading ...</p>}
        {fetchError && <p> {`Error: ${fetchError}`} </p>}
        
        {(tasks.length)? (
          <Task
            tasks = {tasks.filter(task => ((task.task).toLowerCase()).includes((search.toLowerCase())))}
            setTasks = {setTasks}
            HandleChecked={HandleChecked}
            HandleDelete = {HandleDelete}
          />
        
        ) : (
          <p>No Task to Do</p>
        )}
      </main>
    </div>
  );
}

export default App;
