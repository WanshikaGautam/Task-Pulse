import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: `${BASE_URL.replace(/\/$/, '')}/api/tasks`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

// Helper for local storage offline mode
const LOCAL_STORAGE_KEY = 'taskpulse_local_tasks';

const getLocalTasks = () => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveLocalTasks = (tasks) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error('LocalStorage save error:', err);
  }
};

export const taskApi = {
  getTasks: async (search = '', completed = null) => {
    try {
      const response = await api.get('', {
        params: {
          search: search || undefined,
          completed: completed !== null ? completed : undefined,
        },
      });
      // Sync successful response to local backup
      saveLocalTasks(response.data);
      return { data: response.data, isLive: true };
    } catch (err) {
      console.warn('Backend API unavailable, using offline/local storage fallback:', err.message);
      let tasks = getLocalTasks();
      if (search) {
        const q = search.toLowerCase();
        tasks = tasks.filter(
          (t) => t.title?.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q)
        );
      }
      if (completed !== null && completed !== undefined) {
        tasks = tasks.filter((t) => t.completed === completed);
      }
      return { data: tasks, isLive: false };
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await api.post('', taskData);
      return { data: response.data, isLive: true };
    } catch (err) {
      console.warn('Backend API unavailable, saving to local storage fallback');
      const tasks = getLocalTasks();
      const newTask = {
        id: Date.now(),
        title: taskData.title,
        description: taskData.description || '',
        priority: taskData.priority || 'MEDIUM',
        category: taskData.category || 'General',
        completed: false,
        createdAt: new Date().toISOString(),
      };
      tasks.unshift(newTask);
      saveLocalTasks(tasks);
      return { data: newTask, isLive: false };
    }
  },

  updateTask: async (id, taskData) => {
    try {
      const response = await api.put(`/${id}`, taskData);
      return { data: response.data, isLive: true };
    } catch (err) {
      const tasks = getLocalTasks().map((t) =>
        t.id === id ? { ...t, ...taskData } : t
      );
      saveLocalTasks(tasks);
      return { data: { id, ...taskData }, isLive: false };
    }
  },

  toggleTask: async (id) => {
    try {
      const response = await api.patch(`/${id}/toggle`);
      return { data: response.data, isLive: true };
    } catch (err) {
      const tasks = getLocalTasks().map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      saveLocalTasks(tasks);
      const updated = tasks.find((t) => t.id === id);
      return { data: updated, isLive: false };
    }
  },

  deleteTask: async (id) => {
    try {
      await api.delete(`/${id}`);
      return { isLive: true };
    } catch (err) {
      const tasks = getLocalTasks().filter((t) => t.id !== id);
      saveLocalTasks(tasks);
      return { isLive: false };
    }
  },

  getMetrics: async () => {
    try {
      const response = await api.get('/metrics');
      return { data: response.data, isLive: true };
    } catch (err) {
      const tasks = getLocalTasks();
      const total = tasks.length;
      const completed = tasks.filter((t) => t.completed).length;
      const pending = total - completed;
      const rate = total > 0 ? Math.round((completed / total) * 1000) / 10 : 0;
      const highPriorityPending = tasks.filter((t) => t.priority === 'HIGH' && !t.completed).length;

      return {
        data: {
          totalTasks: total,
          completedTasks: completed,
          pendingTasks: pending,
          completionRate: rate,
          highPriorityPending,
        },
        isLive: false,
      };
    }
  },
};

export default taskApi;
