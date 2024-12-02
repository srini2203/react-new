import React, { useState, FC } from 'react';
import './App.css'; 

interface Task {
  name: string;
  assignedTo: string;
  time: string;
}

const App: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [newTask, setNewTask] = useState<string>('');
  const [assignedTo, setAssignedTo] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>('');

  
  const addTask = (): void => {
    if (newTask.trim() === '' || assignedTo === '' || time === '') return;
    setTasks([...tasks, { name: newTask.trim(), assignedTo, time }]);
    setNewTask('');
    setAssignedTo('');
    setTime('');
  };

  
  const deleteTask = (index: number): void => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  
  const startEditing = (index: number): void => {
    setEditingIndex(index);
    setEditingText(tasks[index].name);
  };

  
  const saveTask = (index: number): void => {
    if (editingText.trim() === '') return;
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, name: editingText.trim() } : task
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText('');
  };

  return (
    <div className="container">
      <h1 className="header">Task Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="input"
        />
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="select"
        >
          <option value="">Assign To</option>
          <option value="Sakthi">Sakthi</option>
          <option value="Parasu">Parasu</option>
          <option value="Srini">Srini</option>
        </select>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="input"
        />
        <button onClick={addTask} className="button">Add Task</button>
      </div>
      <ul className="list">
        {tasks.map((task, index) => (
          <li key={index} className="list-item">
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="input"
                />
                <button onClick={() => saveTask(index)} className="button">Save</button>
              </>
            ) : (
              <>
                <span>{task.name}</span>
                <span>Assigned to: {task.assignedTo}</span>
                <span>Time: {task.time}</span>
                <button onClick={() => startEditing(index)} className="button">Edit</button>
                <button onClick={() => deleteTask(index)} className="delete-button">Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;