# IDS Internship Assignment 2 - Project Setup, Authentication, and Roles

Team members: Issam Fawaz and Adam Diab

GitHub repository: https://github.com/issamfawaz/it-helpdesk-ticketing-system

Date: May 31, 2026

## 1. Assignment 2 Objective

Assignment 2 moves the project from planning into initial implementation setup. The goal is to prepare the frontend and backend projects, configure the database connection, implement basic JWT authentication, and define role-based authorization.

This assignment matches the classroom requirements:

- Setup React project.
- Setup ASP.NET Core API.
- Configure PostgreSQL connection.
- Implement JWT authentication.
- Create login/index pages.
- Add role-based authorization.

## 2. Chosen Stack

| Layer | Technology |
| --- | --- |
| Frontend | React.js with Vite |
| Backend | ASP.NET Core Web API |
| Database | PostgreSQL |
| Authentication | JWT Authentication |
| Authorization | Role-based policies |

## 3. Repository Structure Added

```text
backend/
  Helpdesk.Api/
    Controllers/
    Data/
    Models/
    Services/
    Program.cs
    appsettings.json
    Helpdesk.Api.csproj

frontend/
  src/
    api/
    components/
    pages/
    styles/
  index.html
  package.json
```

## 4. Backend Setup

The backend project is located in:

```text
backend/Helpdesk.Api
```

Implemented backend features:

- ASP.NET Core Web API structure.
- PostgreSQL connection string.
- JWT authentication configuration.
- CORS policy for React frontend.
- Role-based authorization policies.
- Login endpoint.
- Current user endpoint.
- Protected sample endpoints.

Main backend files:

- `Program.cs`
- `Controllers/AuthController.cs`
- `Controllers/TicketsController.cs`
- `Controllers/AdminController.cs`
- `Services/JwtTokenService.cs`
- `Services/DemoAuthService.cs`
- `Data/HelpdeskDbContext.cs`
- `appsettings.json`

## 5. PostgreSQL Connection

Database connection string is configured in:

```text
backend/Helpdesk.Api/appsettings.json
```

Current development connection:

```text
Host=localhost;Port=5432;Database=HelpdeskDb;Username=postgres;Password=postgres
```

The Assignment 1 SQL schema already uses PostgreSQL and PascalCase table/column names.

## 6. Authentication

JWT authentication is configured in `Program.cs`.

Login endpoint:

```text
POST /api/auth/login
```

Current user endpoint:

```text
GET /api/auth/me
```

The backend currently uses demo users for Assignment 2 testing. In the next step, user validation can be connected fully to the PostgreSQL `Users` and `Roles` tables.

## 7. Role-Based Authorization

Roles included:

- Admin
- IT Support Agent
- Employee
- Manager

Authorization policies:

| Policy | Allowed Roles |
| --- | --- |
| `AdminOnly` | Admin |
| `AgentOrAdmin` | IT Support Agent, Admin |
| `ManagerOrAdmin` | Manager, Admin |
| `AuthenticatedUser` | Any logged-in user |

Protected endpoint examples:

```text
GET /api/tickets
GET /api/tickets/agent
GET /api/tickets/reports
GET /api/admin/roles
```

## 8. Demo Login Accounts

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@company.com` | `Admin123!` |
| IT Support Agent | `adam.diab@company.com` | `Agent123!` |
| Employee | `issam.fawaz@company.com` | `Employee123!` |
| Manager | `manager@company.com` | `Manager123!` |

## 9. Frontend Setup

The frontend project is located in:

```text
frontend
```

Implemented frontend features:

- Login page.
- Basic authenticated index/dashboard page.
- Role badges.
- Demo accounts.
- API login call to ASP.NET Core backend.
- Local fallback login so the frontend can be reviewed before the API is running.
- Role-based UI content for Admin, Agent, Employee, and Manager.

Main frontend files:

- `src/App.jsx`
- `src/pages/LoginPage.jsx`
- `src/pages/IndexPage.jsx`
- `src/components/RoleBadge.jsx`
- `src/api/authApi.js`
- `src/styles/app.css`

## 10. Run Instructions

Backend:

```bash
cd backend/Helpdesk.Api
dotnet restore
dotnet run
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## 11. Local Tooling Note

On the current machine, the .NET runtime is installed but the .NET SDK was not available, and Node/npm could not be executed from the shell. Because of that, the project files were created manually and are ready to run on a machine with the required SDKs installed.

Required developer tools:

- .NET SDK 8 or newer.
- Node.js and npm.
- PostgreSQL.

## 12. Assignment 2 Deliverables

- React frontend setup.
- ASP.NET Core Web API setup.
- PostgreSQL connection configuration.
- JWT authentication setup.
- Login page.
- Authenticated index/dashboard page.
- Role-based authorization policies.
- Demo accounts for testing roles.
- GitHub repository update.

