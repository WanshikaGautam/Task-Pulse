import React, { useState, useEffect } from 'react';
import { PlusCircle, Save, X, Tag, Flag } from 'lucide-react';

export default function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [category, setCategory] = useState('General');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setPriority(editingTask.priority || 'MEDIUM');
      setCategory(editingTask.category || 'General');
    } else {
      resetForm();
    }
  }, [editingTask]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('MEDIUM');
    setCategory('General');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        priority,
        category: category.trim() || 'General',
      });
      resetForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card form-card">
      <div className="form-header">
        <h3>{editingTask ? 'Edit Task' : 'Create New Task'}</h3>
        {editingTask && (
          <button type="button" onClick={onCancelEdit} className="btn-icon" title="Cancel edit">
            <X size={18} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="task-title">Task Title *</label>
          <input
            id="task-title"
            type="text"
            className="input-field"
            placeholder="e.g. Complete Spring Boot REST API code review"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-desc">Description</label>
          <textarea
            id="task-desc"
            className="input-field textarea-field"
            placeholder="Add details, habit notes, or acceptance criteria..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="form-row">
          <div className="form-group flex-1">
            <label htmlFor="task-priority"><Flag size={14} className="inline-icon" /> Priority</label>
            <select
              id="task-priority"
              className="select-field"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="LOW">Low Priority</option>
              <option value="MEDIUM">Medium Priority</option>
              <option value="HIGH">High Priority</option>
            </select>
          </div>

          <div className="form-group flex-1">
            <label htmlFor="task-category"><Tag size={14} className="inline-icon" /> Category</label>
            <select
              id="task-category"
              className="select-field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="General">General</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Health">Health</option>
              <option value="Study">Study</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          {editingTask && (
            <button type="button" onClick={onCancelEdit} className="btn btn-secondary">
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary" disabled={isSubmitting || !title.trim()}>
            {editingTask ? <Save size={18} /> : <PlusCircle size={18} />}
            <span>{isSubmitting ? 'Saving...' : editingTask ? 'Update Task' : 'Add Task'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
