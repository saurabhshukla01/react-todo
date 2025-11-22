import React from "react";
import TodoList from "../components/Todo/TodoList";
import TodoForm from "../components/Todo/TodoForm";

const TodosPage = () => {
  const handleTodoAdded = () => {
    // refresh TodoList after adding
    console.log("Todo Added");
  };

  return (
    <div>
      <h1>Todos Page</h1>
      <TodoForm onTodoAdded={handleTodoAdded} />
      <TodoList />
    </div>
  );
};

export default TodosPage;
