import RoleBadge from "../components/RoleBadge.jsx";

const roleCards = {
  Admin: [
    "Manage users and roles",
    "Configure ticket categories",
    "View system reports",
    "Monitor activity logs"
  ],
  "IT Support Agent": [
    "View assigned tickets",
    "Update ticket status",
    "Add internal notes",
    "Resolve support requests"
  ],
  Employee: [
    "Create support tickets",
    "Track ticket progress",
    "Reply to agent comments",
    "Upload screenshots or documents"
  ],
  Manager: [
    "Monitor team tickets",
    "Review pending work",
    "Track average resolution time",
    "Export reports later"
  ]
};

export default function IndexPage({ session, onLogout }) {
  const roleActions = roleCards[session.role] ?? roleCards.Employee;

  return (
    <main className="dashboard-page">
      <header className="topbar">
        <div>
          <span className="eyebrow">Authenticated dashboard</span>
          <h1>Welcome, {session.fullName}</h1>
          <p>{session.email}</p>
        </div>
        <div className="topbar-actions">
          <RoleBadge role={session.role} />
          <button className="secondary-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <section className="dashboard-grid">
        <article className="summary-card">
          <span>Open Tickets</span>
          <strong>38</strong>
          <p>Tickets waiting for triage or support action.</p>
        </article>
        <article className="summary-card">
          <span>Pending</span>
          <strong>11</strong>
          <p>Tickets waiting for employee or manager feedback.</p>
        </article>
        <article className="summary-card">
          <span>Resolved</span>
          <strong>64</strong>
          <p>Tickets resolved this month by the support team.</p>
        </article>
      </section>

      <section className="content-panel">
        <div>
          <span className="eyebrow">Role-based authorization</span>
          <h2>{session.role} permissions</h2>
          <p>
            This page demonstrates role-based UI behavior. The backend also has
            matching authorization policies for Admin, Agent, Manager, and Employee access.
          </p>
        </div>

        <div className="permission-list">
          {roleActions.map((action) => (
            <div className="permission-item" key={action}>
              {action}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

