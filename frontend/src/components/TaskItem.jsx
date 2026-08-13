import React from 'react';
import { Check, Edit2, Trash2, Tag, Calendar } from 'lucide-react';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const { id, title, description, priority, completed, category, createdAt } = task;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className={`task-item-card glass-card ${completed ? 'task-completed' : ''}`}>
      <div className="task-item-content">
        <button
          type="button"
          className={`checkbox-toggle ${completed ? 'checked' : ''}`}
          onClick={() => onToggle(id)}
          aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {completed && <Check size={16} strokeWidth={3} />}
        </button>

        <div className="task-main">
          <div className="task-header-row">
            <h4 className="task-title-text">{title}</h4>
            <div className="task-badges">
              <span className={`badge category-badge`}>
                <Tag size={12} /> {category || 'General'}
              </span>
              <span className={`badge priority-badge priority-${priority.toLowerCase()}`}>
                {priority}
              </span>
            </div>
          </div>

          {description && <p className="task-desc-text">{description}</p>}

          <div className="task-meta">
            {createdAt && (
              <span className="task-date">
                <Calendar size={12} /> {formatDate(createdAt)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="action-btn edit-btn"
          title="Edit task"
        >
          <Edit2 size={16} />
        </button>
        <button
          type="button"
          onClick={() => onDelete(id)}
          className="action-btn delete-btn"
          title="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
