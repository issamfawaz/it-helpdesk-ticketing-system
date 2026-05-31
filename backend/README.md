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

