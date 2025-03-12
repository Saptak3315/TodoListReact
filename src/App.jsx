import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoProvider } from './Contexts';
import { TodoForm } from './Components';
import TodoItem from './Components/TodoIteam';

function App() {
  const [todos,std]=useState([]);
  const addTodo=(todo)=>{
    std((prev)=>[...prev,{id:Date.now(),...todo}]);
  }
  const updatedTodo=(id,todo)=>{
    std((prev)=>prev.map((prevtodo)=>(prevtodo.id===id?todo:prevtodo)))
  }
  const deleteTodo=(id)=>{
    std((prev)=>prev.filter((todo)=>todo.id!==id))
  }
  const toggleComplete=(id)=>{
    std((prev)=>prev.map((prevtodo)=>prevtodo.id===id?{...prevtodo,completed:!prevtodo.completed}:prevtodo))
  }
  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"))
    if(todos&&todos.length>0){
      std(todos)
    }
  },[])
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos])
  return (
    <TodoProvider value={{todos,addTodo,updatedTodo,deleteTodo,toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {
                          todos.map((todo)=>(
                            <div key={todo.id}
                              className='w-full'>
                                <TodoItem todo={todo}/>
                            </div>
                          ))
                        }
                    </div>
                </div>
            </div> 
    </TodoProvider>
  )
}

export default App
