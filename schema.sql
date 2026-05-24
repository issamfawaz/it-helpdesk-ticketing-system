-- IDS Internship Assignment 1
-- Project: IT Help Desk & Ticketing Management System
-- Team: Issam Fawaz and Adam Diab
-- Database: PostgreSQL

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    job_title VARCHAR(100),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE support_teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE team_members (
    team_id UUID NOT NULL REFERENCES support_teams(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    member_role VARCHAR(50) NOT NULL DEFAULT 'member',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (team_id, user_id)
);

CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    default_team_id UUID REFERENCES support_teams(id) ON DELETE SET NULL,
    name VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE priorities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    sort_order INTEGER NOT NULL UNIQUE,
    response_target_hours INTEGER,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE statuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    sort_order INTEGER NOT NULL UNIQUE,
    is_terminal BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number BIGINT GENERATED ALWAYS AS IDENTITY UNIQUE,
    requester_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    priority_id UUID NOT NULL REFERENCES priorities(id) ON DELETE RESTRICT,
    status_id UUID NOT NULL REFERENCES statuses(id) ON DELETE RESTRICT,
    assigned_team_id UUID REFERENCES support_teams(id) ON DELETE SET NULL,
    assigned_to_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(180) NOT NULL,
    description TEXT NOT NULL,
    cancellation_reason TEXT,
    due_at TIMESTAMPTZ,
    resolved_at TIMESTAMPTZ,
    closed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE ticket_assignment_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    assigned_team_id UUID REFERENCES support_teams(id) ON DELETE SET NULL,
    assigned_to_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    assigned_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE ticket_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    body TEXT NOT NULL,
    is_internal BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE ticket_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    uploaded_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    content_type VARCHAR(120),
    file_size_bytes BIGINT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
    title VARCHAR(160) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    read_at TIMESTAMPTZ
);

CREATE TABLE knowledge_base_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(180) NOT NULL,
    content TEXT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE ai_suggestions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    suggested_category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    suggested_priority_id UUID REFERENCES priorities(id) ON DELETE SET NULL,
    suggested_reply TEXT,
    confidence_score NUMERIC(5, 4),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
    actor_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(80) NOT NULL,
    old_value TEXT,
    new_value TEXT,
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_users_department_id ON users(department_id);

CREATE INDEX idx_team_members_user_id ON team_members(user_id);

CREATE INDEX idx_categories_default_team_id ON categories(default_team_id);

CREATE INDEX idx_tickets_requester_id ON tickets(requester_id);
CREATE INDEX idx_tickets_category_id ON tickets(category_id);
CREATE INDEX idx_tickets_priority_id ON tickets(priority_id);
CREATE INDEX idx_tickets_status_id ON tickets(status_id);
CREATE INDEX idx_tickets_assigned_team_id ON tickets(assigned_team_id);
CREATE INDEX idx_tickets_assigned_to_user_id ON tickets(assigned_to_user_id);
CREATE INDEX idx_tickets_created_at ON tickets(created_at);

CREATE INDEX idx_ticket_assignment_history_ticket_id ON ticket_assignment_history(ticket_id);
CREATE INDEX idx_ticket_comments_ticket_id ON ticket_comments(ticket_id);
CREATE INDEX idx_ticket_comments_author_id ON ticket_comments(author_id);
CREATE INDEX idx_ticket_attachments_ticket_id ON ticket_attachments(ticket_id);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_ticket_id ON notifications(ticket_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

CREATE INDEX idx_knowledge_base_articles_category_id ON knowledge_base_articles(category_id);
CREATE INDEX idx_ai_suggestions_ticket_id ON ai_suggestions(ticket_id);
CREATE INDEX idx_activity_logs_ticket_id ON activity_logs(ticket_id);
CREATE INDEX idx_activity_logs_actor_user_id ON activity_logs(actor_user_id);

-- Seed/sample data for the Week 1 database design deliverable.

INSERT INTO roles (id, name, description) VALUES
    ('00000000-0000-0000-0000-000000000001', 'Admin', 'Full system access'),
    ('00000000-0000-0000-0000-000000000002', 'IT Support Agent', 'Manage and resolve tickets'),
    ('00000000-0000-0000-0000-000000000003', 'Employee', 'Create and track tickets'),
    ('00000000-0000-0000-0000-000000000004', 'Manager', 'Monitor team tickets and reports');

INSERT INTO priorities (id, name, sort_order, response_target_hours) VALUES
    ('00000000-0000-0000-0000-000000000011', 'Low', 1, 72),
    ('00000000-0000-0000-0000-000000000012', 'Medium', 2, 48),
    ('00000000-0000-0000-0000-000000000013', 'High', 3, 24),
    ('00000000-0000-0000-0000-000000000014', 'Critical', 4, 4);

INSERT INTO statuses (id, name, sort_order, is_terminal) VALUES
    ('00000000-0000-0000-0000-000000000021', 'Open', 1, FALSE),
    ('00000000-0000-0000-0000-000000000022', 'In Progress', 2, FALSE),
    ('00000000-0000-0000-0000-000000000023', 'Pending', 3, FALSE),
    ('00000000-0000-0000-0000-000000000024', 'Resolved', 4, FALSE),
    ('00000000-0000-0000-0000-000000000025', 'Closed', 5, TRUE);

INSERT INTO departments (id, name, description) VALUES
    ('00000000-0000-0000-0000-000000000031', 'IT', 'Information technology department'),
    ('00000000-0000-0000-0000-000000000032', 'Operations', 'Internal business operations'),
    ('00000000-0000-0000-0000-000000000033', 'HR', 'Human resources');

INSERT INTO support_teams (id, name, description) VALUES
    ('00000000-0000-0000-0000-000000000041', 'IT Support', 'General support and hardware issues'),
    ('00000000-0000-0000-0000-000000000042', 'Network Team', 'Network, VPN, and connectivity issues'),
    ('00000000-0000-0000-0000-000000000043', 'Security Team', 'Accounts, permissions, and access requests');

INSERT INTO categories (id, default_team_id, name, description) VALUES
    ('00000000-0000-0000-0000-000000000051', '00000000-0000-0000-0000-000000000041', 'Hardware', 'Laptop, printer, monitor, or device issues'),
    ('00000000-0000-0000-0000-000000000052', '00000000-0000-0000-0000-000000000041', 'Software', 'Application installation or software errors'),
    ('00000000-0000-0000-0000-000000000053', '00000000-0000-0000-0000-000000000042', 'Network', 'Wi-Fi, VPN, and connectivity issues'),
    ('00000000-0000-0000-0000-000000000054', '00000000-0000-0000-0000-000000000043', 'Email', 'Email access and mailbox issues'),
    ('00000000-0000-0000-0000-000000000055', '00000000-0000-0000-0000-000000000043', 'Access Request', 'Permissions, accounts, and system access'),
    ('00000000-0000-0000-0000-000000000056', '00000000-0000-0000-0000-000000000041', 'Other', 'General IT support');

