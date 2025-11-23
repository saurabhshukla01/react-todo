import axios from "axios";

const API_URL = "http://127.0.0.1:8000/todos";

// GET all todos
export const getTodos = () => axios.get(`${API_URL}/`);

// GET single todo by UUID
export const getTodoByUUID = (uuid) => axios.get(`${API_URL}/${uuid}`);

// CREATE todo
export const createTodo = (data) => axios.post(`${API_URL}/`, data);

// UPDATE todo by UUID
export const updateTodo = (uuid, data) => axios.put(`${API_URL}/${uuid}`, data);

// DELETE todo by UUID
export const deleteTodo = (uuid) => axios.delete(`${API_URL}/${uuid}`);
