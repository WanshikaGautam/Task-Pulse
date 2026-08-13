import React from 'react';
import TaskItem from './TaskItem';
import { CheckCircle, Inbox } from 'lucide-react';

export default function TaskList({ tasks, isLoading, onToggle, onEdit, onDelete }) {
  if (isLoading) {
    return (
      <div className="task-list-loading glass-card">
        <div className="spinner"></div>
        <p>Syncing tasks with server...</p>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list-empty glass-card">
        <div className="empty-icon-wrap">
          <Inbox size={48} className="empty-icon" />
        </div>
        <h3>No Tasks Found</h3>
        <p>Stay productive! Create your first task using the form above.</p>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
