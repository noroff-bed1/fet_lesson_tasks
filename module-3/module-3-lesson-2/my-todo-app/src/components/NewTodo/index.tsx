import { ReactNode } from 'react';

interface NewToDoProps {
  handleAddTodo: (title: string) => void;
}

function NewToDo({ handleAddTodo }: NewToDoProps): ReactNode {
  function handleAddToDoForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Assert event.target as HTMLFormElement
    const form = event.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement; // Assert the first element as HTMLInputElement
    const title = input.value;
    handleAddTodo(title);
    form.reset();
  }

  return (
    <div>
      <h2>Add To Do</h2>
      <form onSubmit={handleAddToDoForm}>
        <input type="text" placeholder="Add a new To Do" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default NewToDo;
