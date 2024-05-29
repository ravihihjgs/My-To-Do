import React, { useState } from 'react';
import Tasklist from './components/Tasklist';
import './App.css';


const App = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('low');
  const [tasks, setTasks] = useState([]);

  const getRandomColor = () => {
    const colors = [
      'bg-red-600',
      'bg-green-600',
      'bg-blue-600',
      'bg-pink-600',
      'bg-indigo-600',
      'bg-purple-600',
      'bg-teal-600',
      'bg-yellow-600',
      'bg-orange-600',
      'bg-cyan-600',
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const handleEditTask = (index, editedTitle, editedDesc) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].title = editedTitle;
    updatedTasks[index].desc = editedDesc;
    setTasks(updatedTasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;

    const newTask = {
      title: title,
      desc: desc,
      priority: priority,
      color: getRandomColor(),
    };

    setTasks([...tasks, newTask]);
    setTitle('');
    setDesc('');
    setPriority('low');
  };

  const onDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="bg-gray-800 text-white p-2 rounded mb-5 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded mb-5 mr-2"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded mb-5 mr-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" className="bg-gray-800 text-white p-2 rounded">
          Add Task
        </button>
      </form>
       <Tasklist tasks={tasks} onDelete={onDeleteTask} onEdit={handleEditTask} />
    </div>
  );
};

export default App;
