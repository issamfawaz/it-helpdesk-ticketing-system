import { useEffect, useState } from "react";
import RoleBadge from "../components/RoleBadge.jsx";
import TicketManagementPage from "./TicketManagementPage.jsx";

const navItems = [
  { id: "helpdesk-dashboard", label: "Dashboard" },
  { id: "tickets", label: "Tickets" },
  { id: "reports", label: "Reports" }
];

export default function IndexPage({ session, onLogout }) {
  const [activeSection, setActiveSection] = useState("helpdesk-dashboard");

  useEffect(() => {
    function updateActiveSection() {
      let nextSection = "helpdesk-dashboard";
      const activationLine = 150;

      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (!section) {
          continue;
        }

        const rect = section.getBoundingClientRect();
        if (rect.top <= activationLine && rect.bottom > activationLine) {
          nextSection = item.id;
        }
      }

      const atPageEnd =
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24;

      if (atPageEnd) {
        const visibleSection = [...navItems]
          .reverse()
          .find((item) => {
            const section = document.getElementById(item.id);
            if (!section) {
              return false;
            }

            const rect = section.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
          });

        if (visibleSection) {
          nextSection = visibleSection.id;
        }
      }

      setActiveSection(nextSection);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, []);

  return (
    <main className="app-shell">
      <aside className="app-sidebar">
        <div className="brand-block">
          <span>IT</span>
          <div>
            <strong>Helpdesk</strong>
            <small>Support workspace</small>
          </div>
        </div>

        <nav className="side-nav" aria-label="Helpdesk sections">
          {navItems.map((item) => (
            <a
              aria-current={activeSection === item.id ? "page" : undefined}
              className={activeSection === item.id ? "active" : ""}
              href={`#${item.id}`}
              key={item.id}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="sidebar-user">
          <span className="sidebar-label">Signed in as</span>
          <RoleBadge role={session.role} />
          <strong>{session.fullName}</strong>
          <span>{session.email}</span>
        </div>
      </aside>

      <section className="app-main">
        <header className="app-topbar">
          <div>
            <span className="eyebrow">IT Help Desk</span>
            <h1>Ticket Management</h1>
            <p>Centralized support queue with assignment workflow, comments, attachments, notifications, reports, and AI category/priority suggestions.</p>
          </div>
          <div className="topbar-actions">
            <button className="secondary-button" onClick={onLogout}>
              Logout
            </button>
          </div>
        </header>

        <TicketManagementPage session={session} />
      </section>
    </main>
  );
}
