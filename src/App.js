import React, { useState, useEffect } from 'react';  

function App() {  
  const [tasks, setTasks] = useState(() => {  
    const savedTasks = localStorage.getItem('tasks');  
    return savedTasks ? JSON.parse(savedTasks) : [];  
  });  
  const [taskInput, setTaskInput] = useState('');  

  useEffect(() => {  
    localStorage.setItem('tasks', JSON.stringify(tasks));  
  }, [tasks]);  

  const addTask = () => {  
    if (taskInput.trim() === '') return;  
    const newTask = {  
      id: Date.now(),  
      text: taskInput,  
      completed: false,  
    };  
    setTasks([...tasks, newTask]);  
    setTaskInput('');  
  };  

  const toggleComplete = (id) => {  
    setTasks(tasks.map(task =>   
      task.id === id ? { ...task, completed: !task.completed } : task  
    ));  
  };  

  const deleteTask = (id) => {  
    setTasks(tasks.filter(task => task.id !== id));  
  };  

  const remainingTasks = tasks.filter(task => !task.completed).length;  

  return (  
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">  
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">  
        <h1 className="text-2xl font-bold mb-4 text-center">Task List</h1>  
        
        {/* Input and Button */}  
        <div className="flex mb-4">  
          <input  
            type="text"  
            placeholder="Enter a task"  
            value={taskInput}  
            onChange={(e) => setTaskInput(e.target.value)}  
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
          />  
          <button  
            onClick={addTask}  
            className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"  
          >  
            Add Task  
          </button>  
        </div>  
        
        {/* Tasks List */}  
        <ul className="space-y-2">  
          {tasks.map(task => (  
            <li key={task.id} className="flex items-center justify-between p-2 border border-gray-200 rounded">  
              <div className="flex items-center space-x-2">  
                <input  
                  type="checkbox"  
                  checked={task.completed}  
                  onChange={() => toggleComplete(task.id)}  
                />  
                <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : ''}`}>  
                  {task.text}  
                </span>  
              </div>  
              <button  
                onClick={() => deleteTask(task.id)}  
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"  
              >  
                Delete  
              </button>  
            </li>  
          ))}  
        </ul>  

        {/* Tasks remaining */}  
        <p className="mt-4 text-center text-gray-700">{remainingTasks} task{remainingTasks !== 1 ? 's' : ''} remaining</p>  
      </div>  
    </div>  
  );  
}  

export default App;  