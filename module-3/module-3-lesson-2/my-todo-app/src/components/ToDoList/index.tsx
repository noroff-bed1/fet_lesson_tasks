import React from 'react';
import { IToDo } from '../../types';
import ToDo from '../ToDo';

interface IToDoListProps {
  todos: IToDo[];
  handleDeleteToDo: (id: string) => void;
  handleToggleToDo: (id: string) => void;
}

const ToDoList: React.FC<IToDoListProps> = ({
  todos,
  handleDeleteToDo,
  handleToggleToDo,
}) => {
  return (
    <div>
      <h1>My To-Do List</h1>
      <div>
        {todos.map((todo) => (
          <ToDo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            isCompleted={todo.completed}
            handleDeleteToDo={handleDeleteToDo}
            handleToggleToDo={handleToggleToDo}
          />
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
