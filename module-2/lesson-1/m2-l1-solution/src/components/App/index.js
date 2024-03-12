import React, { useState } from 'react';
import TaskInput from '../TaskInput';

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Adds a new task, using the Date.now() epoch time as the id
  const addTask = (taskDescription) => {
    setTasks([...tasks, { id: Date.now(), description: taskDescription }]);
  };

  // Remove a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Toggles the completion status of a task
  const toggleCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <div>
      <TaskInput onAddTask={addTask} />
      {tasks.length ? (
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.description}
              <button onClick={() => toggleCompletion(task.id)}>
                Toggle Complete
              </button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks added yet. Start adding some!</p>
      )}
    </div>
  );
};

export default App;
