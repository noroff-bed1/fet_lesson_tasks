import React from 'react';
import styles from './index.module.css';

// Define the props for the ToDo component
interface IToDoProps {
  id: string;
  title: string;
  isCompleted: boolean;
  handleDeleteToDo: (id: string) => void;
  handleToggleToDo: (id: string) => void;
}

// Define the ToDo component
const ToDo: React.FC<IToDoProps> = ({
  id,
  title,
  isCompleted,
  handleDeleteToDo,
  handleToggleToDo,
}: IToDoProps) => {
  return (
    <div className={styles.toDoContainer}>
      <h3 className={styles.toDoTitle}>{title}</h3>
      {/* Add a checkbox to show whether the task is completed or not */}
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => handleToggleToDo(id)}
      />
      {/* Add a button to delete the task, which calls a function we pass
      into the component */}
      <button onClick={() => handleDeleteToDo(id)}>X</button>
    </div>
  );
};

export default ToDo;
