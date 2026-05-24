# IDS Internship Assignment 1 - IT Help Desk & Ticketing Management System

Team members: Issam Fawaz and Adam Diab

GitHub repository: https://github.com/issamfawaz/it-helpdesk-ticketing-system

Date: May 24, 2026

## 1. How We Understand Assignment 1

The classroom document describes the full 8-week Full Stack Web Development Internship Project. Assignment 1 matches Week 1 from that timeline:

```text
Requirement analysis, project planning, UI wireframes, ERD/database schema
Deliverables: Wireframes, ERD, project proposal
Estimated hours: 25 hrs
```

Because of that, this submission focuses on planning and design, not full implementation yet. The full system will be developed over the internship, but Assignment 1 prepares the foundation.

## 2. Project Overview

The purpose of this project is to design and develop a modern web-based IT Help Desk & Ticketing Management System that helps streamline technical support operations inside the company.

Employees will be able to submit support requests, while IT support agents, managers, and administrators can manage, prioritize, assign, monitor, and resolve tickets through a centralized dashboard.

The project simulates a real-world enterprise software environment. It includes frontend development, backend APIs, relational database design, authentication, reporting, deployment planning, and possible AI-powered automation features.

## 3. Project Objectives

By the end of the internship, the project should help interns practice:

- Building a complete full stack web application.
- Designing and implementing RESTful APIs.
- Creating responsive and modern user interfaces.
- Managing a relational database.
- Implementing authentication and role-based authorization.
- Building dashboards and reporting screens.
- Using Git and collaborative workflows.
- Preparing deployment to staging or production.
- Planning AI-powered features such as categorization, priority suggestions, and suggested replies.

## 4. Chosen Technology Stack

| Layer | Selected Technology | Notes |
| --- | --- | --- |
| Frontend | React.js | Used for reusable UI pages and components. |
| Styling/UI | Tailwind CSS or Material UI later | The wireframes are framework-neutral but SaaS-style. |
| Backend | ASP.NET Core Web API | Main backend choice for REST APIs, authentication, and role-based access. |
| Database | PostgreSQL | Relational database selected from the suggested SQL Server/PostgreSQL options. |
| Authentication | JWT Authentication / ASP.NET Identity planned | Needed for protected API routes and roles. |
| Deployment | Azure, IIS, Docker, or similar later | Final deployment is part of later weeks. |
| AI Integration | OpenAI API / Azure OpenAI planned as advanced feature | Useful for ticket categorization and suggested replies. |

## 5. System Users and Roles

| Role | Permissions |
| --- | --- |
| Admin | Full system access, user management, role management, settings, reports, categories. |
| IT Support Agent | Manage, assign, update, comment on, and resolve tickets. |
| Employee | Create support tickets, track ticket progress, reply to comments. |
| Manager | Monitor team tickets and reports without full admin access. |

## 6. Assignment 1 Scope

In scope for Assignment 1:

- Understand project requirements.
- Define system modules and features.
- Create initial UI wireframes.
- Design the relational database schema.
- Prepare ERD diagram.
- Plan application architecture.
- Prepare GitHub repository structure.
- Document routes, pages, and component names for the future React frontend.

Not expected yet in Assignment 1:

- Completed React application.
- Completed ASP.NET Core API.
- Working login system.
- Deployed website.
- Final AI integration.
- Final dashboard/report exports.

Those belong to later internship weeks.

## 7. Planned System Modules

### Authentication and User Management

Planned features:

- User login.
- User registration or admin-created users.
- Password encryption.
- Forgot/reset password.
- Profile management.
- Role-based access control.
- Session/token management.
- User activity logging.

Main requirements:

- Secure authentication using JWT.
- Password validation.
- Protected API routes.
- Role checks for Admin, Agent, Employee, and Manager.

### Ticket Management Module

Planned features:

- Create support tickets.
- Edit/update tickets.
- Delete or cancel tickets when allowed.
- Track full ticket history.
- Generate readable ticket reference numbers.
- Search and filter tickets.

Ticket categories:

- Hardware
- Software
- Network
- Email
- Access Request
- Other

Ticket priorities:

- Low
- Medium
- High
- Critical

Ticket statuses:

- Open
- In Progress
- Pending
- Resolved
- Closed

### Ticket Assignment and Workflow

Planned features:

- Assign tickets to support agents.
- Assign tickets to support teams.
- Reassign tickets.
- Add internal comments and notes.
- Track assignment history.
- Keep an audit trail for ticket actions.

Manual assignment will be part of the first implementation. Automatic assignment can be added later after categories and teams are stable.

### Communication and Notifications

Planned features:

- In-app notifications.
- Ticket update alerts.
- Comment and reply system.
- Agent mentions.
- Email notifications later.

Optional advanced feature:

- Real-time updates using SignalR or WebSockets.

### Dashboard and Reporting

Planned dashboard widgets:

- Open tickets count.
- Resolved tickets count.
- Pending tickets count.
- Tickets by category.
- Tickets by priority.
- Agent performance charts.

Planned reports:

- Monthly ticket reports.
- Average resolution time.
- SLA reports as optional advanced feature.
- Employee activity reports.
- Export to PDF or Excel later.

### Knowledge Base Module

This is an optional advanced module, but we included it in the database plan so the system can grow.

Planned features:

- FAQ management.
- Troubleshooting articles.
- Searchable documentation.
- Category-based articles.
- Admin approval before publishing.

### File Attachments

Planned features:

- Upload screenshots or documents.
- Attach logs or files to tickets.
- Download attachments securely.

Main requirements:

- File size validation.
- Supported file type validation.
- Secure file storage.

### Admin Panel

Planned features:

- User management.
- Role management.
- Ticket category management.
- System settings.
- Report generation.
- Activity logging.

Main requirements:

- Restricted admin access.
- System monitoring dashboard.

### AI-Powered Features

These are advanced features for later weeks:

- AI ticket categorization.
- AI priority suggestion.
- AI suggested replies.
- AI chat assistant for employees before creating a ticket.

For Assignment 1, these are included in the architecture and database as planned future features, not completed features.

## 8. UI/UX Planning

The system should use a modern, responsive SaaS-style interface.

Suggested pages from the classroom brief:

- Login / Register
- Dashboard
- Ticket List
- Ticket Details
- Create Ticket
- Reports
- Notifications
- User Profile
- Admin Settings

Wireframes are prepared in:

`wireframes/wireframes.html`

The wireframes currently cover the most important Week 1 planning screens:

- `AuthLoginPage`
- `EmployeeTicketListPage`
- `TicketCreatePage`
- `TicketDetailPage`
- `AgentQueuePage`
- `ManagerReportsPage`
- `NotificationsPage`
- `AdminConsolePage`

Register, Profile, and Knowledge Base are included in the frontend component plan as planned routes/modules.

## 9. Frontend Component and Route Plan

The detailed React route and component plan is prepared in:

`docs/frontend_component_plan.md`

Example planned page names:

- `AuthLoginPage`
- `EmployeeTicketListPage`
- `TicketCreatePage`
- `TicketDetailPage`
- `AgentQueuePage`
- `ManagerReportsPage`
- `NotificationsPage`
- `KnowledgeBasePage`
- `AdminConsolePage`

Naming the pages early helps connect the wireframes to the future React implementation.

## 10. Database Design

The PostgreSQL schema is prepared in:

`database/schema.sql`

The classroom brief asks for a relational database including:

- Users
- Roles
- Tickets
- TicketComments
- TicketAttachments
- Notifications
- Categories
- Priorities
- Statuses
- ActivityLogs

Our schema includes those tables and also adds practical supporting tables:

- Departments
- SupportTeams
- TeamMembers
- TicketAssignmentHistory
- KnowledgeBaseArticles
- AISuggestions

The SQL file also includes seed/sample data for:

- Roles
- Priorities
- Statuses
- Departments
- Support teams
- Categories

## 11. ERD Diagram

The ERD diagram is prepared in:

`diagrams/erd.mmd`

Main relationships:

- A role has many users.
- A department has many users.
- An employee can create many tickets.
- A support agent can be assigned many tickets.
- A ticket belongs to one category, priority, and status.
- A ticket can have comments, attachments, notifications, assignment history, AI suggestions, and activity logs.
- A knowledge base article can belong to a category.

## 12. Workflow Diagrams

Workflow diagrams are prepared in:

`diagrams/system_workflows.md`

The workflow diagrams cover:

- Ticket submission.
- Ticket triage and assignment.
- Ticket resolution and closure.
- High-level role interaction with the system.

## 13. Application Architecture

The application architecture diagram is prepared in:

`diagrams/application_architecture.mmd`

Planned architecture:

```text
React.js frontend
  -> ASP.NET Core Web API controllers
    -> Application services
      -> Entity Framework Core DbContext
        -> PostgreSQL database
```

Backend layers:

- Controllers handle HTTP requests.
- DTOs define request and response shapes.
- Services contain business logic.
- Entity Framework Core handles database access.
- PostgreSQL stores relational data.
- Authentication middleware protects routes.

Frontend layers:

- Pages represent full screens.
- Components are reused across pages.
- Services call backend APIs.
- Role guards protect admin, agent, manager, and employee routes.

## 14. Initial API Endpoint Plan

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/login` | Authenticate a user. |
| POST | `/api/auth/register` | Register or create a user if enabled. |
| GET | `/api/tickets` | List tickets with role-based filters. |
| POST | `/api/tickets` | Create a new ticket. |
| GET | `/api/tickets/{id}` | View ticket details. |
| PATCH | `/api/tickets/{id}` | Update status, priority, category, or assignment. |
| POST | `/api/tickets/{id}/comments` | Add a public comment or internal note. |
| POST | `/api/tickets/{id}/attachments` | Upload an attachment. |
| GET | `/api/notifications` | List user notifications. |
| PATCH | `/api/notifications/{id}/read` | Mark notification as read. |
| GET | `/api/reports/summary` | Dashboard summary data. |
| GET | `/api/categories` | List ticket categories. |
| GET | `/api/admin/users` | Admin user list. |
| POST | `/api/admin/users` | Admin creates a new user. |
| GET | `/api/knowledge-base` | Search knowledge base articles. |
| POST | `/api/ai/ticket-suggestions` | Generate AI category, priority, or reply suggestions later. |

## 15. 8-Week Project Timeline

| Week | Focus | Deliverables |
| --- | --- | --- |
| 1 | Requirement analysis, planning, wireframes, ERD/database schema | Wireframes, ERD, project proposal |
| 2 | Project setup, authentication, role management | Login/Register system, JWT auth |
| 3 | Ticket CRUD, categories, priorities | Functional ticket module |
| 4 | Assignment workflow, comments, statuses | Workflow implementation |
| 5 | Notifications, file uploads, dashboard analytics | Dashboard and notification system |
| 6 | Reports, charts, export functionality, AI basics | Reporting module and AI prototype |
| 7 | Testing, bug fixing, optimization, responsive UI | Stable staging version |
| 8 | Deployment, documentation, final presentation/demo | Final deployed project |

## 16. GitHub Repository Preparation

Repository link:

https://github.com/issamfawaz/it-helpdesk-ticketing-system

Recommended structure:

```text
it-helpdesk-ticketing-system/
  backend/
  frontend/
  database/
  diagrams/
  docs/
  wireframes/
  README.md
```

## 17. Team Task Split

Issam Fawaz:

- Database schema.
- ERD diagram.
- ASP.NET Core Web API planning.
- GitHub repository organization.

Adam Diab:

- UI wireframes.
- Workflow diagrams.
- React component and route planning.
- Documentation review.

Shared:

- Requirement gathering.
- Architecture review.
- Final submission check.

## 18. Assignment 1 Final Deliverables

- Project proposal and scope.
- Workflow diagrams.
- UI wireframes/mockups.
- Frontend component and route plan.
- PostgreSQL database schema.
- Seed/sample SQL data.
- ERD diagram.
- Application architecture plan.
- GitHub repository link.
