import React from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';

export default function TaskFilter({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  onRefresh,
}) {
  return (
    <div className="filter-toolbar glass-card">
      <div className="search-box">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks by title or details..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button className="clear-search" onClick={() => onSearchChange('')}>
            &times;
          </button>
        )}
      </div>

      <div className="filter-group">
        <div className="tab-buttons">
          <button
            className={`tab-btn ${statusFilter === 'ALL' ? 'active' : ''}`}
            onClick={() => onStatusFilterChange('ALL')}
          >
            All
          </button>
          <button
            className={`tab-btn ${statusFilter === 'ACTIVE' ? 'active' : ''}`}
            onClick={() => onStatusFilterChange('ACTIVE')}
          >
            Pending
          </button>
          <button
            className={`tab-btn ${statusFilter === 'COMPLETED' ? 'active' : ''}`}
            onClick={() => onStatusFilterChange('COMPLETED')}
          >
            Completed
          </button>
        </div>

        <div className="select-wrap">
          <Filter size={16} className="select-icon" />
          <select
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
          >
            <option value="ALL">All Priorities</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="LOW">Low Priority</option>
          </select>
        </div>

        <button className="btn-icon refresh-btn" onClick={onRefresh} title="Refresh tasks">
          <RefreshCw size={18} />
        </button>
      </div>
    </div>
  );
}
