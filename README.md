# IT Helpdesk Ticketing System

IDS Internship full stack web development project

Team members:
- Issam Fawaz
- Adam Diab

Repository:
https://github.com/issamfawaz/it-helpdesk-ticketing-system

## Project Overview

The IT Helpdesk Ticketing System is a web-based support platform for managing internal company technical support requests.

Employees can create and track support tickets, while IT support agents and administrators can manage ticket priority, assignment, status, comments, and resolution progress through a centralized dashboard.

The project is being developed as a full stack internship project using React.js, ASP.NET Core Web API, and PostgreSQL.

## Technology Stack

| Layer | Technology |
| --- | --- |
| Frontend | React.js |
| Backend | ASP.NET Core Web API |
| Database | PostgreSQL |
| Authentication | JWT authentication and role-based authorization |
| Source Control | GitHub |

## User Roles

| Role | Main Responsibilities |
| --- | --- |
| Admin | Manage users, roles, categories, reports, and system settings |
| IT Support Agent | Manage, update, assign, and resolve tickets |
| Employee | Create tickets and track their own requests |
| Manager | Review team tickets and reports |

## Current Project Structure

```text
it-helpdesk-ticketing-system/
  backend/
    Helpdesk.Api/
  frontend/
    src/
  database/
    schema.sql
  diagrams/
    application_architecture.mmd
    erd.mmd
    system_workflows.md
  docs/
    IDS_Assignment1_Report.html
    assignment2_report.md
    assignment3_report.md
    assignment4_report.md
    assignment5_report.md
    frontend_component_plan.md
    project_proposal.md
  wireframes/
    wireframes.html
  README.md
```

## Assignment Progress

This README is the main project overview. Each time a new internship assignment is completed, its deliverables are added here so the repository stays organized in one place.

### Assignment 1 - Project Planning, Wireframes, ERD, and Architecture

Status: Completed

Main work completed:
- Defined project scope and system requirements
- Prepared project proposal
- Created workflow diagrams
- Created UI wireframes
- Designed PostgreSQL database schema
- Prepared ERD diagram
- Planned application architecture
- Prepared GitHub repository structure

Files to review:

| Deliverable | File |
| --- | --- |
| Full assignment report | `docs/IDS_Assignment1_Report.html` |
| Project proposal | `docs/project_proposal.md` |
| Workflow diagrams | `diagrams/system_workflows.md` |
| Application architecture diagram | `diagrams/application_architecture.mmd` |
| ERD diagram | `diagrams/erd.mmd` |
| PostgreSQL schema | `database/schema.sql` |
| UI wireframes | `wireframes/wireframes.html` |
| Frontend component plan | `docs/frontend_component_plan.md` |

Database naming note:
The SQL schema uses PascalCase table and column names, such as `Tickets`, `TicketComments`, `TicketId`, and `CreatedAt`.

### Assignment 2 - Project Setup, Authentication, and Role Management

Status: Completed

Main work completed:
- Set up React frontend project
- Set up ASP.NET Core Web API backend project
- Configured PostgreSQL connection structure
- Implemented JWT authentication structure
- Added role-based authorization policies
- Created login/index pages
- Added demo accounts for Employee, IT Support Agent, Admin, and Manager

Files to review:

| Deliverable | File |
| --- | --- |
| Assignment 2 report | `docs/assignment2_report.md` |
| Backend API project | `backend/Helpdesk.Api` |
| Frontend React project | `frontend` |
| Backend setup notes | `backend/README.md` |
| Frontend setup notes | `frontend/README.md` |

Demo accounts:

| Role | Email | Password |
| --- | --- | --- |
| Employee | `issam.fawaz@company.com` | `Employee123!` |
| IT Support Agent | `adam.diab@company.com` | `Agent123!` |
| Admin | `admin@company.com` | `Admin123!` |
| Manager | `manager@company.com` | `Manager123!` |

### Assignment 3 - Ticket CRUD and Frontend API Integration

Status: Completed

Main work completed:
- Built ticket CRUD backend endpoints
- Added ticket category API
- Added in-memory ticket service for local development
- Connected React frontend with ticket APIs
- Created ticket management page
- Added create ticket form
- Added edit/update ticket flow
- Added delete ticket action
- Added role-aware frontend behavior for Employee and IT Support Agent accounts

Files to review:

| Deliverable | File |
| --- | --- |
| Assignment 3 report | `docs/assignment3_report.md` |
| Ticket API controller | `backend/Helpdesk.Api/Controllers/TicketsController.cs` |
| Categories API controller | `backend/Helpdesk.Api/Controllers/CategoriesController.cs` |
| Ticket service | `backend/Helpdesk.Api/Services/InMemoryTicketService.cs` |
| Ticket DTOs | `backend/Helpdesk.Api/Models/TicketDtos.cs` |
| React ticket API service | `frontend/src/api/ticketsApi.js` |
| React ticket management page | `frontend/src/pages/TicketManagementPage.jsx` |

Implemented API routes:

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/tickets` | List tickets |
| GET | `/api/tickets/{id}` | View one ticket |
| POST | `/api/tickets` | Create ticket |
| PUT | `/api/tickets/{id}` | Update ticket |
| DELETE | `/api/tickets/{id}` | Delete ticket |
| GET | `/api/categories` | List ticket categories |

### Assignment 4 - Ticket Assignment, Workflow, Comments, and History

Status: Completed

Main work completed:
- Built ticket assignment workflow for support agents
- Added ticket status update workflow logic
- Added public comments and employee replies
- Added internal notes for IT Support Agents and Admins
- Added ticket activity history and audit trail entries
- Added status timeline UI for selected tickets
- Connected React workflow controls with backend APIs

Files to review:

| Deliverable | File |
| --- | --- |
| Assignment 4 report | `docs/assignment4_report.md` |
| Ticket workflow controller | `backend/Helpdesk.Api/Controllers/TicketsController.cs` |
| Ticket workflow service | `backend/Helpdesk.Api/Services/InMemoryTicketService.cs` |
| Ticket workflow DTOs | `backend/Helpdesk.Api/Models/TicketDtos.cs` |
| Ticket workflow records | `backend/Helpdesk.Api/Models/TicketRecord.cs` |
| React ticket API service | `frontend/src/api/ticketsApi.js` |
| React workflow page | `frontend/src/pages/TicketManagementPage.jsx` |
| Workflow styling | `frontend/src/styles/app.css` |

Implemented workflow API routes:

| Method | Route | Purpose |
| --- | --- | --- |
| PATCH | `/api/tickets/{id}/assignment` | Assign ticket to an agent |
| PATCH | `/api/tickets/{id}/status` | Update ticket workflow status |
| GET | `/api/tickets/{id}/comments` | View comments and notes |
| POST | `/api/tickets/{id}/comments` | Add comment or internal note |
| GET | `/api/tickets/{id}/activity` | View ticket history and audit trail |
| GET | `/api/tickets/agents` | List available support agents |

### Assignment 5 - Dashboard Analytics, Notifications, and File Attachments

Status: Completed

Main work completed:
- Built dashboard analytics API
- Added KPI cards for ticket and attachment statistics
- Added chart-style analytics for status, category, priority, and agent workload
- Added notification center API
- Added read/unread notification behavior
- Added ticket attachment API
- Added screenshot/document upload UI
- Added attachment activity log entries

Files to review:

| Deliverable | File |
| --- | --- |
| Assignment 5 report | `docs/assignment5_report.md` |
| Dashboard and attachment routes | `backend/Helpdesk.Api/Controllers/TicketsController.cs` |
| Notification routes | `backend/Helpdesk.Api/Controllers/NotificationsController.cs` |
| Analytics/notification/attachment service | `backend/Helpdesk.Api/Services/InMemoryTicketService.cs` |
| Dashboard and attachment DTOs | `backend/Helpdesk.Api/Models/TicketDtos.cs` |
| React API integration | `frontend/src/api/ticketsApi.js` |
| Dashboard and attachment UI | `frontend/src/pages/TicketManagementPage.jsx` |
| Dashboard styling | `frontend/src/styles/app.css` |

Implemented assignment 5 API routes:

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/tickets/dashboard` | Return KPI and chart data |
| GET | `/api/notifications` | Return notification center items |
| PATCH | `/api/notifications/{id}/read` | Mark notification as read |
| GET | `/api/tickets/{id}/attachments` | Return ticket attachments |
| POST | `/api/tickets/{id}/attachments` | Upload screenshot/document metadata |

## How To Run Locally

### Frontend

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

Frontend URL:

```text
http://localhost:5173
```

### Backend

```powershell
cd backend/Helpdesk.Api
dotnet restore
dotnet run
```

The React frontend can use the backend API when the backend is running. If the backend is not running, the frontend has local fallback data for demo and testing.

## Testing Checklist

Use this checklist before submitting each assignment:

- Frontend loads successfully
- Login works with demo accounts
- Employee account can create tickets
- IT Support Agent account can edit and delete tickets
- IT Support Agent account can assign tickets to agents
- IT Support Agent account can update ticket status
- Comments and internal notes save correctly
- Activity history updates after assignment, status changes, and comments
- Dashboard KPI cards load correctly
- Notification center marks items as read
- Attachment upload accepts supported files and updates the selected ticket
- Ticket category dropdown works
- Ticket table updates after create, edit, and delete actions
- Backend builds successfully
- Frontend builds successfully
- GitHub repository contains the required files
- `node_modules`, `dist`, `bin`, and `obj` are not uploaded

## Future Assignments

New assignments should be added under this section using the same format:

```text
### Assignment X - Assignment Title

Status: In Progress / Completed

Main work completed:
- Item 1
- Item 2
- Item 3

Files to review:
- file path 1
- file path 2
```
