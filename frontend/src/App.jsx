import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import MetricsDashboard from './components/MetricsDashboard';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import { taskApi } from './api/taskApi';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [metrics, setMetrics] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    completionRate: 0,
    highPriorityPending: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [editingTask, setEditingTask] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      let filterCompleted = null;
      if (statusFilter === 'COMPLETED') filterCompleted = true;
      if (statusFilter === 'ACTIVE') filterCompleted = false;

      const [tasksData, metricsData] = await Promise.all([
        taskApi.getTasks(searchQuery, filterCompleted),
        taskApi.getMetrics(),
      ]);

      setTasks(tasksData || []);
      setMetrics(metricsData || {});
      setIsConnected(true);
    } catch (err) {
      console.error('Failed to connect to backend REST API:', err);
      setIsConnected(false);
      showNotification('Could not reach backend server. Make sure Spring Boot is running on port 8080.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, statusFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateOrUpdateTask = async (taskData) => {
    try {
      if (editingTask) {
        await taskApi.updateTask(editingTask.id, taskData);
        showNotification('Task updated successfully!', 'success');
        setEditingTask(null);
      } else {
        await taskApi.createTask(taskData);
        showNotification('New task created!', 'success');
      }
      loadData();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Error saving task', 'error');
    }
  };

  const handleToggleTask = async (id) => {
    try {
      await taskApi.toggleTask(id);
      loadData();
    } catch (err) {
      showNotification('Failed to toggle completion state.', 'error');
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await taskApi.deleteTask(id);
      showNotification('Task deleted', 'info');
      loadData();
    } catch (err) {
      showNotification('Failed to delete task.', 'error');
    }
  };

  // Client-side priority filtering on top of server data
  const filteredTasks = tasks.filter((task) => {
    if (priorityFilter !== 'ALL' && task.priority !== priorityFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="app-layout">
      <Header completionRate={metrics.completionRate || 0} isConnected={isConnected} />

      <main className="main-content">
        {notification && (
          <div className={`notification-banner ${notification.type}`}>
            {notification.message}
          </div>
        )}

        <MetricsDashboard metrics={metrics} />

        <div className="content-grid">
          <aside className="sidebar-section">
            <TaskForm
              onSubmit={handleCreateOrUpdateTask}
              editingTask={editingTask}
              onCancelEdit={() => setEditingTask(null)}
            />
          </aside>

          <section className="feed-section">
            <TaskFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={setPriorityFilter}
              onRefresh={loadData}
            />

            <TaskList
              tasks={filteredTasks}
              isLoading={isLoading}
              onToggle={handleToggleTask}
              onEdit={(task) => setEditingTask(task)}
              onDelete={handleDeleteTask}
            />
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>TaskPulse &copy; {new Date().getFullYear()} &bull; Built with Spring Boot & React.js</p>
      </footer>
    </div>
  );
}
