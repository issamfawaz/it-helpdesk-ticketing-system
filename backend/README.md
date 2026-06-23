# Backend Setup - Assignment 2

Project: IT Help Desk & Ticketing Management System

Backend stack:
- ASP.NET Core Web API
- PostgreSQL
- JWT Authentication
- Role-based authorization

## What This Backend Includes

- ASP.NET Core Web API project structure.
- PostgreSQL connection string in `appsettings.json`.
- JWT authentication configuration.
- Role authorization policies:
  - `AdminOnly`
  - `AgentOrAdmin`
  - `ManagerOrAdmin`
  - `AuthenticatedUser`
- Login endpoint:
  - `POST /api/auth/login`
- Current user endpoint:
  - `GET /api/auth/me`
- Protected sample ticket endpoints.
- Assignment 3 ticket CRUD endpoints:
  - `GET /api/tickets`
  - `GET /api/tickets/{id}`
  - `POST /api/tickets`
  - `PUT /api/tickets/{id}`
  - `DELETE /api/tickets/{id}`
- Ticket category endpoint:
  - `GET /api/categories`
- Assignment 4 workflow endpoints:
  - `PATCH /api/tickets/{id}/assignment`
  - `PATCH /api/tickets/{id}/status`
  - `GET /api/tickets/{id}/comments`
  - `POST /api/tickets/{id}/comments`
  - `GET /api/tickets/{id}/activity`
  - `GET /api/tickets/agents`
- Assignment 5 dashboard, notification, and attachment endpoints:
  - `GET /api/tickets/dashboard`
  - `GET /api/notifications`
  - `PATCH /api/notifications/{id}/read`
  - `GET /api/tickets/{id}/attachments`
  - `POST /api/tickets/{id}/attachments`

## Demo Login Accounts

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@company.com` | `Admin123!` |
| IT Support Agent | `adam.diab@company.com` | `Agent123!` |
| Employee | `issam.fawaz@company.com` | `Employee123!` |
| Manager | `manager@company.com` | `Manager123!` |

## Run Commands

Install the .NET SDK first, then run:

```bash
cd backend/Helpdesk.Api
dotnet restore
dotnet run
```

The API should run on a local ASP.NET Core port and accept requests from the React frontend at `http://localhost:5173`.

## Assignment 3 Note

Ticket CRUD is implemented through `TicketsController`, `CategoriesController`, and `InMemoryTicketService`. This keeps the assignment reviewable before full database persistence is connected in a later milestone.

## Assignment 4 Note

Ticket assignment, status workflow logic, comments, internal notes, and activity history are implemented in `TicketsController` and `InMemoryTicketService`. The workflow uses role-based authorization so only IT Support Agents and Admins can assign tickets, change statuses, and add internal notes.

## Assignment 5 Note

Dashboard analytics, notification center items, and attachment metadata are implemented through `TicketsController`, `NotificationsController`, and `InMemoryTicketService`. Attachments are validated by file type and size, then stored as in-memory metadata for the assignment demo.
