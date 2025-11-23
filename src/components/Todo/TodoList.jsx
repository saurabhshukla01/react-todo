import React, { useEffect, useState } from "react";
import { getTodos, deleteTodo, getTodoByUUID } from "../../api/todoService";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedUUID, setSelectedUUID] = useState(null);
  const [viewTodo, setViewTodo] = useState(null);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 20;

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await getTodos();
      setTodos(res.data);
      setCurrentPage(1); // Reset page after update/create/delete
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // VIEW TODO POPUP
  const handleView = async (uuid) => {
    try {
      const res = await getTodoByUUID(uuid);
      setViewTodo(res.data);
    } catch (error) {
      console.error("Error fetching todo:", error);
    }
  };

  // OPEN ADD FORM
  const openAddForm = () => {
    setSelectedUUID(null);
    setShowForm(true);
  };

  // OPEN EDIT FORM
  const openEditForm = (uuid) => {
    setSelectedUUID(uuid);
    setShowForm(true);
  };

  // DELETE TODO
  const handleDelete = async (uuid) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;

    try {
      await deleteTodo(uuid);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // SEARCH FILTER
  const filteredTodos = todos.filter((t) =>
    `${t.title} ${t.description}`.toLowerCase().includes(search.toLowerCase())
  );

  // RESET PAGE ON SEARCH
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // PAGINATION
  const indexOfLast = currentPage * todosPerPage;
  const indexOfFirst = indexOfLast - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  return (
    <div>
      <h2>Todo List</h2>

      <button onClick={openAddForm} style={{ marginBottom: "15px" }}>
        Add New Todo
      </button>

      <input
        type="text"
        placeholder="Search title or description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginLeft: "20px", padding: "8px", width: "300px" }}
      />

      {/* ADD / EDIT TOD0 FORM POPUP */}
      {showForm && (
        <TodoForm
          selectedUUID={selectedUUID}
          onClose={() => setShowForm(false)}
          refreshList={fetchTodos}
        />
      )}

      {/* VIEW POPUP */}
      {viewTodo && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "30%",
            width: "40%",
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px #555",
            zIndex: 999,
          }}
        >
          <h3>Todo Details</h3>
          <p><strong>UUID:</strong> {viewTodo.uuid}</p>
          <p><strong>Title:</strong> {viewTodo.title}</p>
          <p><strong>Description:</strong> {viewTodo.description}</p>
          <p><strong>Priority:</strong> {viewTodo.priority}</p>
          <p><strong>Status:</strong> {viewTodo.status}</p>
          <p><strong>Scheduled:</strong> {viewTodo.scheduled_date}</p>
          <p><strong>Created:</strong> {viewTodo.created_at}</p>
          <p><strong>Updated:</strong> {viewTodo.updated_at}</p>

          <button onClick={() => setViewTodo(null)}>Close</button>
        </div>
      )}

      {/* TABLE LIST */}
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>UUID</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Description</th>
            <th>Scheduled Date</th>
            <th>Created</th>
            <th>Updated</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentTodos.map((todo) => (
            <tr key={todo.uuid}>
              <td>{todo.uuid}</td>
              <td>{todo.title}</td>
              <td>{todo.priority}</td>
              <td>{todo.status}</td>
              <td>{todo.description}</td>
              <td>{todo.scheduled_date}</td>
              <td>{todo.created_at}</td>
              <td>{todo.updated_at}</td>

              <td style={{ textAlign: "center" }}>
                <button onClick={() => handleView(todo.uuid)}>👁</button>
                <button onClick={() => openEditForm(todo.uuid)}>✏</button>
                <button onClick={() => handleDelete(todo.uuid)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              margin: "5px",
              padding: "6px 12px",
              background: currentPage === i + 1 ? "#007bff" : "#eee",
              color: currentPage === i + 1 ? "#fff" : "#000",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
