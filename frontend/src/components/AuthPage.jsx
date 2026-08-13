import React, { useState } from 'react';
import { Activity, LogIn, UserPlus, Lock, Mail, User, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AuthPage({ onLogin, onRegister, isSubmitting, authError, onGuestLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      onRegister({ username, email, password });
    } else {
      onLogin({ username, password });
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container glass-card">
        <div className="auth-header">
          <div className="auth-logo-box">
            <Activity className="auth-logo-icon" />
          </div>
          <h2 className="auth-title">Welcome to TaskPulse</h2>
          <p className="auth-subtitle">
            {isSignUp
              ? 'Create a personal account to track your daily tasks & habits'
              : 'Sign in to access your secure productivity dashboard'}
          </p>
        </div>

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${!isSignUp ? 'active' : ''}`}
            onClick={() => setIsSignUp(false)}
          >
            <LogIn size={16} /> Sign In
          </button>
          <button
            type="button"
            className={`auth-tab ${isSignUp ? 'active' : ''}`}
            onClick={() => setIsSignUp(true)}
          >
            <UserPlus size={16} /> Create Account
          </button>
        </div>

        {authError && <div className="notification-banner error">{authError}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="auth-username">
              <User size={14} className="inline-icon" /> {isSignUp ? 'Username' : 'Username or Email'}
            </label>
            <input
              id="auth-username"
              type="text"
              className="input-field"
              placeholder={isSignUp ? 'Choose a unique username' : 'Enter your username or email'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label htmlFor="auth-email">
                <Mail size={14} className="inline-icon" /> Email Address
              </label>
              <input
                id="auth-email"
                type="email"
                className="input-field"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="auth-password">
              <Lock size={14} className="inline-icon" /> Password
            </label>
            <input
              id="auth-password"
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={4}
            />
          </div>

          <button type="submit" className="btn btn-primary auth-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button
          type="button"
          onClick={onGuestLogin}
          className="btn btn-secondary guest-btn"
        >
          <ShieldCheck size={18} />
          <span>Continue as Guest User</span>
        </button>
      </div>
    </div>
  );
}
