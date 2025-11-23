import axios from "axios";

const API_URL = "http://127.0.0.1:8000";  // FIXED

export const getUsers = () => axios.get(`${API_URL}/users`);

export const getUserByUUID = (uuid) => axios.get(`${API_URL}/users/${uuid}`);

export const createUser = (data) => axios.post(`${API_URL}/users`, data);

export const updateUser = (uuid, data) => axios.put(`${API_URL}/users/${uuid}`, data);

export const deleteUser = (uuid) => axios.delete(`${API_URL}/users/${uuid}`);

// GET USER TODOS
export const getUserTodos = (uuid) => axios.get(`${API_URL}/users/${uuid}/todos`);
