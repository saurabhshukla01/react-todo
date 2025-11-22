import React, { useEffect, useState } from "react";
import { getTodos, deleteTodo } from "../../api/todoService";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  const handleDelete = async (uuid) => {
    await deleteTodo(uuid);
    fetchTodos();
  };

  const handleEdit = (uuid) => {
    alert(`Edit todo with UUID: ${uuid}`);
    // Implement your edit logic here
  };

  return (
    <div>
      <h2>Todo List</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>UUID</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>UserName</th>
            <th>Description</th>
            <th>Scheduled Date</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.uuid}</td>
              <td>{todo.title}</td>
              <td>{todo.priority}</td>
              <td>{todo.status}</td>
              <td>{"Saurabh Shukla"}</td>
              <td>{todo.description}</td>
              <td>{todo.scheduled_date}</td>
              <td>{todo.created_at}</td>
              <td>{todo.updated_at}</td>
              <td>
                <button onClick={() => handleEdit(todo.uuid)} style={{ marginRight: '8px' }}>Edit</button>
                <button onClick={() => handleDelete(todo.uuid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;