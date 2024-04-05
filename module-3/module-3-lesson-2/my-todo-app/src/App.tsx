import { useState } from 'react';
import './App.css';
import NewToDo from './components/NewTodo';
import ToDoList from './components/ToDoList';
import { IToDo } from './types';
import { todos as todosMockData } from './mock-data';

function App() {
  // Use the todosMockData as the initial state for the todos.
  // This would usually come from something such as an API call.
  const [todos, setTodos] = useState<IToDo[]>(() => todosMockData);

  const handleAddToDo = (title: string) => {
    // Create a new todo object
    const newTodo: IToDo = {
      // Using a random number as the id. This is usually handled by a database
      id: Math.random().toString(),
      title,
      completed: false,
    };
    // Add the new todo to the existing todos
    setTodos([...todos, newTodo]);
  };

  const handleDeleteToDo = (id: string) => {
    // Filter out the todo with the id that matches the id passed in
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleToggleToDo = (id: string) => {
    // Map over the todos and toggle the completed value of the todo with the matching id
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(newTodos);
  };

  return (
    <div>
      <NewToDo handleAddTodo={handleAddToDo} />
      <ToDoList
        todos={todos}
        handleDeleteToDo={handleDeleteToDo}
        handleToggleToDo={handleToggleToDo}
      />
    </div>
  );
}

export default App;
