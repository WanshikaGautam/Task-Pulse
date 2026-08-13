import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: `${BASE_URL.replace(/\/$/, '')}/api/tasks`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const taskApi = {
  // Fetch all tasks with optional search query & completion filter
  getTasks: async (search = '', completed = null) => {
    const params = {};
    if (search) params.search = search;
    if (completed !== null && completed !== undefined) params.completed = completed;
    
    const response = await api.get('', { params });
    return response.data;
  },

  // Get single task by ID
  getTaskById: async (id) => {
    const response = await api.get(`/${id}`);
    return response.data;
  },

  // Create a new task
  createTask: async (taskData) => {
    const response = await api.post('', taskData);
    return response.data;
  },

  // Update existing task
  updateTask: async (id, taskData) => {
    const response = await api.put(`/${id}`, taskData);
    return response.data;
  },

  // Toggle completion status
  toggleTask: async (id) => {
    const response = await api.patch(`/${id}/toggle`);
    return response.data;
  },

  // Delete task
  deleteTask: async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
  },

  // Fetch productivity metrics counter data
  getMetrics: async () => {
    const response = await api.get('/metrics');
    return response.data;
  },
};

export default taskApi;
