import React, { useEffect, useState } from "react";
import { createTodo, updateTodo, getTodoByUUID } from "../../api/todoService";

const TodoForm = ({ selectedUUID, onClose, refreshList }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
    scheduled_date: "",
  });

  // Load todo when editing
  useEffect(() => {
    if (selectedUUID) loadTodo(selectedUUID);
  }, [selectedUUID]);

  const loadTodo = async (uuid) => {
    try {
      const res = await getTodoByUUID(uuid);

      // Only pick fields needed in form
      setFormData({
        title: res.data.title || "",
        description: res.data.description || "",
        priority: res.data.priority || "",
        status: res.data.status || "",
        scheduled_date: res.data.scheduled_date || "",
      });
    } catch (error) {
      console.error("Error loading todo:", error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit for create / update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUUID) {
        await updateTodo(selectedUUID, formData);
      } else {
        await createTodo(formData);
      }

      await refreshList(); // wait for reload
      onClose(); // close popup

    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "10%",
        left: "30%",
        width: "40%",
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px #555",
        zIndex: "999",
      }}
    >
      <h3>{selectedUUID ? "Edit Todo" : "Add New Todo"}</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Priority:</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label>Scheduled Date:</label>
          <input
            type="date"
            name="scheduled_date"
            value={formData.scheduled_date}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <br />

        <button type="submit" style={{ marginRight: "10px" }}>
          {selectedUUID ? "Update" : "Save"}
        </button>

        <button
          type="button"
          onClick={onClose}
          style={{ background: "red", color: "#fff" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
