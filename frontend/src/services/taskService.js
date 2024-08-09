import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks/';

const getTasks = async (page) => {
    const response = await axios.get(`${API_URL}?page=${page}`);
    return response.data;
};

const createTask = async (taskData) => {
    const response = await axios.post(API_URL, taskData);
    return response.data;
};

const getTaskById = async (id) => {
    const response = await axios.get(`${API_URL}${id}`);
    return response.data;
};

const updateTask = async (id, taskData) => {
    const response = await axios.put(`${API_URL}${id}`, taskData);
    return response.data;
};

const deleteTask = async (id) => {
    const response = await axios.delete(`${API_URL}${id}`);
   
    return response.data;
};

export default {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
};