# Frontend Setup - Assignment 2

Project: IT Help Desk & Ticketing Management System

Frontend stack:
- React.js
- Vite
- Role-aware login/index pages

## What This Frontend Includes

- Login page.
- Basic authenticated index/dashboard page.
- Demo accounts for Admin, IT Support Agent, Employee, and Manager.
- API login call to the ASP.NET Core backend.
- Local fallback login for demo use before the backend is running.
- Role-based UI examples after login.

## Demo Login Accounts

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@company.com` | `Admin123!` |
| IT Support Agent | `adam.diab@company.com` | `Agent123!` |
| Employee | `issam.fawaz@company.com` | `Employee123!` |
| Manager | `manager@company.com` | `Manager123!` |

## Run Commands

Install Node.js first, then run:

```bash
cd frontend
npm install
npm run dev
```

The frontend expects the API base URL from:

```text
VITE_API_BASE_URL=https://localhost:5001/api
```

