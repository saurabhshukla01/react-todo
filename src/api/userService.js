import axios from "axios";

const API_URL = "http://127.0.0.1:8000/users";

export const getUsers = () => axios.get(`${API_URL}`);

export const getUserByUUID = (uuid) => axios.get(`${API_URL}/${uuid}`);

export const createUser = (data) => axios.post(`${API_URL}`, data);

export const updateUser = (uuid, data) => axios.put(`${API_URL}/${uuid}`, data);

export const deleteUser = (uuid) => axios.delete(`${API_URL}/${uuid}`);
