import { useState } from "react";

const demoUsers = [
  ["Employee", "issam.fawaz@company.com", "Employee123!"],
  ["IT Support Agent", "adam.diab@company.com", "Agent123!"],
  ["Manager", "manager@company.com", "Manager123!"],
  ["Admin", "admin@company.com", "Admin123!"]
];

const productHighlights = [
  "Role-based access",
  "Ticket workflow",
  "Reports export",
  "AI triage"
];

export default function LoginPage({ error, isLoading, onLogin }) {
  const [email, setEmail] = useState("issam.fawaz@company.com");
  const [password, setPassword] = useState("Employee123!");

  function handleSubmit(event) {
    event.preventDefault();
    onLogin({ email, password });
  }

  return (
    <main className="auth-page">
      <section className="auth-intro">
        <span className="eyebrow">Enterprise helpdesk portal</span>
        <h1>IT Help Desk & Ticketing Management System</h1>
        <p>
          A role-based support workspace for employees, agents, managers, and administrators
          to track tickets, attachments, reports, notifications, and AI-assisted triage.
        </p>
        <div className="auth-feature-grid">
          {productHighlights.map((highlight) => (
            <span key={highlight}>{highlight}</span>
          ))}
        </div>
      </section>

      <section className="login-panel">
        <div>
          <span className="eyebrow">Secure access</span>
          <h2>Sign in</h2>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email address
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              autoComplete="email"
              required
            />
          </label>

          <label>
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              autoComplete="current-password"
              required
            />
          </label>

          {error ? <p className="error-text">{error}</p> : null}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="demo-box">
          <strong>Demo accounts</strong>
          {demoUsers.map(([role, userEmail, userPassword]) => (
            <button
              className="demo-account"
              key={userEmail}
              type="button"
              onClick={() => {
                setEmail(userEmail);
                setPassword(userPassword);
              }}
            >
              <span>{role}</span>
              <small>{userEmail}</small>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
