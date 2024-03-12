import React, { useState, useMemo, useCallback } from 'react';

function TaskList({ tasks, onComplete }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.text}
          <button onClick={() => onComplete(task.id)}>
            Complete {task.complete ? '✔' : '❌'}
          </button>
        </li>
      ))}
    </ul>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTask = (text) => {
    setTasks((prev) => [...prev, { id: Date.now(), text, complete: false }]);
  };

  const handleComplete = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, complete: !task.complete } : task,
      ),
    );
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === 'complete') return task.complete;
      if (filter === 'incomplete') return !task.complete;
      return true;
    });
  }, [tasks, filter]);

  return (
    <div>
      <input
        type="text"
        onKeyUp={(event) => {
          if (event.key === 'Enter' && event.target.value !== '') {
            addTask(event.target.value);
            event.target.value = '';
          }
        }}
      />
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('complete')}>Complete</button>
      <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      <TaskList tasks={filteredTasks} onComplete={handleComplete} />
    </div>
  );
}

export default App;
