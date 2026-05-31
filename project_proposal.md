# Project Proposal - IT Help Desk & Ticketing Management System

Team members: Issam Fawaz and Adam Diab

GitHub repository: https://github.com/issamfawaz/it-helpdesk-ticketing-system

## Project Title

IT Help Desk & Ticketing Management System

## Project Type

Full Stack Web Development Internship Project

## Problem Statement

Inside a company, IT support requests can easily become scattered across phone calls, messages, emails, and informal conversations. This makes it difficult to know which issue is still open, who is responsible for it, how urgent it is, and whether it was resolved.

The proposed system solves this by turning every IT support request into a structured ticket with a status, priority, category, assignee, comments, attachments, notifications, and activity history.

## Proposed Solution

We will design and develop a web-based IT Help Desk & Ticketing Management System. Employees will create and track tickets, IT support agents will manage and resolve tickets, managers will monitor team performance, and admins will manage system settings and users.

## Main Users

| Role | Main Purpose |
| --- | --- |
| Admin | Full system access, settings, users, roles, reports, and categories. |
| IT Support Agent | Assign, update, comment on, and resolve tickets. |
| Employee | Create tickets, add replies, upload attachments, and track status. |
| Manager | Monitor team tickets, workload, and reports. |

## Selected Technology Stack

| Layer | Technology |
| --- | --- |
| Frontend | React.js |
| Backend | ASP.NET Core Web API |
| Database | PostgreSQL |
| Authentication | JWT Authentication / ASP.NET Identity planned |
| Source Control | GitHub |
| AI Integration | OpenAI API or Azure OpenAI planned as advanced feature |

## Main Modules

- Authentication and user management.
- Ticket management.
- Ticket assignment and workflow.
- Comments and internal notes.
- Notifications.
- File attachments.
- Dashboard and reporting.
- Admin panel.
- Knowledge base as optional advanced module.
- AI-powered ticket categorization, priority suggestion, and suggested replies as advanced features.

## Assignment 1 Deliverables

For Week 1, our deliverables are:

- Requirement analysis.
- Project planning.
- UI wireframes.
- ERD diagram.
- PostgreSQL database schema.
- SQL seed/sample data.
- Application architecture diagram.
- Frontend route and component plan.

Database naming convention:

- Table names and column names use PascalCase.
- Examples: `Tickets`, `TicketComments`, `TicketId`, `CreatedAt`.
- PostgreSQL double quotes are used in the SQL script to preserve PascalCase names.

## Expected Outcome

By the end of the internship, the project should become a working enterprise-style help desk application that demonstrates full stack development, API design, database architecture, authentication, reporting, collaborative Git workflow, and planned AI-assisted support features.
