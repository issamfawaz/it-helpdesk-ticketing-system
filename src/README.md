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
- Assignment 3 ticket management screen.
- Ticket create/edit/delete UI.
- Category dropdown connected through the ticket API service.
- Assignment 4 ticket workflow screen.
- Ticket assignment, status timeline, comments, internal notes, and activity history UI.
- Assignment 5 dashboard analytics, KPI cards, notifications, and attachment upload UI.

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

## Assignment 3 Note

Ticket CRUD integration is implemented in:

```text
src/api/ticketsApi.js
src/pages/TicketManagementPage.jsx
```

The frontend calls the backend APIs when available and uses local fallback data if the backend is not running.

## Assignment 4 Note

Ticket workflow integration is implemented in the same ticket management screen:

```text
src/api/ticketsApi.js
src/pages/TicketManagementPage.jsx
src/styles/app.css
```

The screen supports assigning tickets to agents, updating ticket status, adding employee replies, adding internal notes for support roles, and showing ticket activity history.

## Assignment 5 Note

Dashboard analytics, notification center, and file attachments are implemented in:

```text
src/api/ticketsApi.js
src/pages/TicketManagementPage.jsx
src/styles/app.css
```

The screen includes KPI cards, chart-style analytics, unread notification handling, and screenshot/document upload for the selected ticket.
