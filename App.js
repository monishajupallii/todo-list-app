import React, { useState } from 'react';
import './App.css';

function App() {
  // State for managing tasks
  const [tasks, setTasks] = useState([]);
  // State for managing new task input
  const [newTask, setNewTask] = useState('');
  // State for managing due date input
  const [dueDate, setDueDate] = useState('');
  // State for managing category input
  const [category, setCategory] = useState('');
  // State for managing reminders
  const [reminders, setReminders] = useState(false);

  // Function to handle input change for new task
  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  // Function to handle input change for due date
  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  // Function to handle input change for category
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() !== '' && category.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false, dueDate, category, reminders }]);
      setNewTask('');
      setDueDate('');
      setCategory('');
      setReminders(false);
    }
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Function to toggle task completion status
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  // Group tasks by category
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {});

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter task"
          value={newTask}
          onChange={handleInputChange}
        />
        <input
          type="date"
          placeholder="Due date"
          value={dueDate}
          onChange={handleDueDateChange}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={handleCategoryChange}
        />
        <label>
          <input
            type="checkbox"
            checked={reminders}
            onChange={() => setReminders(!reminders)}
          />
          Reminders
        </label>
        <button onClick={addTask}>Add</button>
      </div>
      <div className="task-list">
        {Object.entries(groupedTasks).map(([category, tasks]) => (
          <div key={category} className="category-block">
            <h2>{category}</h2>
            <ul>
              {tasks.map(task => (
                <li key={task.id} className={task.completed ? 'completed' : ''}>
                  <div>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                    />
                    <span>{task.text}</span>
                  </div>
                  <div>
                    {task.dueDate && <span>Due Date: {task.dueDate}</span>}
                    {task.reminders && <span>Reminders: On</span>}
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
