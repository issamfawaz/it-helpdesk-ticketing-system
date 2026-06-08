# IDS Internship Assignment 3 - Ticket Management CRUD and API Integration

Team members: Issam Fawaz and Adam Diab

GitHub repository: https://github.com/issamfawaz/it-helpdesk-ticketing-system

Date: June 8, 2026

## 1. Assignment 3 Objective

Assignment 3 focuses on building the ticket management system. The goal is to implement ticket CRUD operations, support ticket categories, and connect the React frontend to backend APIs.

Classroom objectives:

- Build ticket management system.
- Implement CRUD operations.
- Connect frontend with backend APIs.

Classroom tasks:

- Create tickets.
- Edit/update tickets.
- Delete tickets.
- Implement ticket categories.
- Connect React with APIs.

## 2. Team Split

Issam Fawaz focused on backend work:

- Ticket CRUD API endpoints.
- Ticket category API endpoint.
- Ticket DTOs and request models.
- Ticket service layer.
- Backend validation and role protection.

Adam Diab focused on frontend work:

- React ticket management page.
- Ticket create/edit form.
- Ticket table and actions.
- Category dropdown integration.
- Frontend API service functions.

Shared work:

- Testing the local flow.
- Reviewing feature coverage against the assignment requirements.
- Using AI as a required development support tool.

## 3. Backend Implementation

Backend folder:

```text
backend/Helpdesk.Api
```

New and updated backend files:

- `Controllers/TicketsController.cs`
- `Controllers/CategoriesController.cs`
- `Models/TicketDtos.cs`
- `Models/TicketRecord.cs`
- `Services/ITicketService.cs`
- `Services/InMemoryTicketService.cs`
- `Program.cs`

## 4. API Endpoints

Ticket endpoints:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/tickets` | List all tickets. |
| GET | `/api/tickets/{id}` | Get a single ticket by id. |
| POST | `/api/tickets` | Create a new ticket. |
| PUT | `/api/tickets/{id}` | Update an existing ticket. |
| DELETE | `/api/tickets/{id}` | Delete a ticket. |
| GET | `/api/tickets/agent` | Agent/Admin queue view. |
| GET | `/api/tickets/reports` | Manager/Admin summary counts. |

Category endpoint:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/categories` | List ticket categories. |

## 5. Ticket Categories

The API includes the following categories:

- Hardware
- Software
- Network
- Email
- Access Request
- Other

These match the project brief and the Assignment 1 database design.

## 6. Role Protection

The ticket API uses the existing Assignment 2 authentication and authorization setup.

- Any authenticated user can list and create tickets.
- IT Support Agent and Admin can update and delete tickets.
- Manager and Admin can view report summary data.

This keeps the implementation aligned with role-based authorization.

## 7. Frontend Implementation

Frontend folder:

```text
frontend
```

New and updated frontend files:

- `src/api/ticketsApi.js`
- `src/pages/TicketManagementPage.jsx`
- `src/pages/IndexPage.jsx`
- `src/styles/app.css`

Implemented frontend features:

- Load tickets from the backend API.
- Load categories from the backend API.
- Create ticket form.
- Edit/update ticket form.
- Delete ticket action.
- Ticket table.
- Category dropdown.
- Priority and status fields.
- Role-based edit/delete visibility.

## 8. API Connection Strategy

The frontend service file `ticketsApi.js` calls:

```text
GET /api/tickets
POST /api/tickets
PUT /api/tickets/{id}
DELETE /api/tickets/{id}
GET /api/categories
```

The frontend also includes a local fallback data set. This allows the assignment to be demonstrated from the React app even if the ASP.NET Core backend is not running on the review machine.

When the backend is running, the React app uses the backend API. When the backend is unavailable, it uses local browser storage for demo continuity.

## 9. AI Usage Note

AI was used as required by the internship instructions. It supported:

- Planning the backend ticket CRUD structure.
- Drafting DTOs, services, and controller endpoints.
- Designing the React ticket management UI.
- Connecting frontend API functions to backend routes.
- Reviewing the assignment requirements against the implemented files.
- Producing documentation and team task split.

All generated work was reviewed and adapted to match the project stack:

- React.js frontend.
- ASP.NET Core Web API backend.
- PostgreSQL database plan.
- Role-based authorization.

## 10. Demo Instructions

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

Demo login accounts:

| Role | Email | Password |
| --- | --- | --- |
| Employee | `issam.fawaz@company.com` | `Employee123!` |
| IT Support Agent | `adam.diab@company.com` | `Agent123!` |
| Admin | `admin@company.com` | `Admin123!` |
| Manager | `manager@company.com` | `Manager123!` |

Backend:

```bash
cd backend/Helpdesk.Api
dotnet restore
dotnet run
```

Note: the frontend can still demonstrate the ticket management screens using fallback local data if the backend is not running.

## 11. Assignment 3 Deliverables

- Ticket CRUD backend API.
- Ticket categories backend API.
- React ticket management page.
- React API service integration.
- Create/edit/delete ticket UI.
- Assignment 3 documentation.
- AI usage note.

