import React from 'react';
import { Activity, CheckCircle2, Zap } from 'lucide-react';

export default function Header({ completionRate = 0, isConnected = true }) {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="brand-box">
          <div className="logo-icon-wrap">
            <Activity className="logo-icon" />
          </div>
          <div>
            <h1 className="app-title">TaskPulse</h1>
            <p className="app-subtitle">Personal Task & Habit Tracker</p>
          </div>
        </div>

        <div className="header-actions">
          <div className="status-pill">
            <span className={`status-dot ${isConnected ? 'online' : 'offline'}`}></span>
            <span className="status-text">{isConnected ? 'API Connected' : 'Connecting...'}</span>
          </div>

          <div className="productivity-badge">
            <Zap className="badge-icon" />
            <span>{completionRate}% Productivity</span>
          </div>
        </div>
      </div>
    </header>
  );
}
