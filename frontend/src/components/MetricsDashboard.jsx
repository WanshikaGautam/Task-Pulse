import React from 'react';
import { ListTodo, CheckCircle2, Clock, Flame, AlertTriangle } from 'lucide-react';

export default function MetricsDashboard({ metrics }) {
  const {
    totalTasks = 0,
    completedTasks = 0,
    pendingTasks = 0,
    completionRate = 0,
    highPriorityPending = 0,
  } = metrics || {};

  return (
    <section className="metrics-grid">
      <div className="metric-card cyan-glow">
        <div className="card-top">
          <span className="card-label">Total Tasks</span>
          <div className="card-icon cyan"><ListTodo size={20} /></div>
        </div>
        <div className="card-value">{totalTasks}</div>
        <div className="card-foot">Tracked in system</div>
      </div>

      <div className="metric-card green-glow">
        <div className="card-top">
          <span className="card-label">Completed</span>
          <div className="card-icon green"><CheckCircle2 size={20} /></div>
        </div>
        <div className="card-value">{completedTasks}</div>
        <div className="card-foot">Tasks accomplished</div>
      </div>

      <div className="metric-card amber-glow">
        <div className="card-top">
          <span className="card-label">Pending</span>
          <div className="card-icon amber"><Clock size={20} /></div>
        </div>
        <div className="card-value">{pendingTasks}</div>
        <div className="card-foot">Waiting for completion</div>
      </div>

      <div className="metric-card purple-glow">
        <div className="card-top">
          <span className="card-label">Completion Rate</span>
          <div className="card-icon purple"><Flame size={20} /></div>
        </div>
        <div className="card-value">{completionRate}%</div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${Math.min(100, Math.max(0, completionRate))}%` }}
          ></div>
        </div>
      </div>

      {highPriorityPending > 0 && (
        <div className="metric-card red-glow alert-card">
          <div className="card-top">
            <span className="card-label">Urgent Attention</span>
            <div className="card-icon red"><AlertTriangle size={20} /></div>
          </div>
          <div className="card-value">{highPriorityPending}</div>
          <div className="card-foot">High priority task{highPriorityPending > 1 ? 's' : ''} pending</div>
        </div>
      )}
    </section>
  );
}
