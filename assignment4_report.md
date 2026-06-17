# IDS Internship Assignment 4 - Ticket Assignment, Workflow, Comments, and History

Project: IT Helpdesk Ticketing System

Team members:
- Issam Fawaz
- Adam Diab

## 1. Assignment 4 Objective

Assignment 4 focuses on the ticket workflow after a ticket is created. The goal is to allow support staff to assign tickets, update ticket statuses, add comments or replies, and track all important ticket actions through an activity history.

## 2. Completed Scope

The following requirements were implemented:

- Assign tickets to support agents.
- Update ticket statuses through workflow actions.
- Add public comments and employee replies.
- Add internal notes for support agents and admins.
- Track ticket activity history.
- Display a status timeline for the selected ticket.
- Keep role-based restrictions for workflow actions.

## 3. Backend Implementation

The backend was extended inside the ASP.NET Core Web API project.

Main backend files:

| File | Purpose |
| --- | --- |
| `backend/Helpdesk.Api/Controllers/TicketsController.cs` | Ticket workflow endpoints |
| `backend/Helpdesk.Api/Services/ITicketService.cs` | Ticket workflow service contract |
| `backend/Helpdesk.Api/Services/InMemoryTicketService.cs` | Assignment, status, comment, and activity logic |
| `backend/Helpdesk.Api/Models/TicketDtos.cs` | Request and response DTOs |
| `backend/Helpdesk.Api/Models/TicketRecord.cs` | In-memory ticket, comment, and activity records |

## 4. Backend API Routes

| Method | Route | Purpose | Access |
| --- | --- | --- | --- |
| GET | `/api/tickets` | List tickets | Authenticated users |
| GET | `/api/tickets/{id}` | View one ticket | Authenticated users |
| PATCH | `/api/tickets/{id}/assignment` | Assign ticket to an agent | IT Support Agent, Admin |
| PATCH | `/api/tickets/{id}/status` | Update ticket status | IT Support Agent, Admin |
| GET | `/api/tickets/{id}/comments` | View comments | Authenticated users |
| POST | `/api/tickets/{id}/comments` | Add comment or internal note | Authenticated users |
| GET | `/api/tickets/{id}/activity` | View ticket activity history | Authenticated users |
| GET | `/api/tickets/agents` | List support agents | IT Support Agent, Admin |

## 5. Workflow Logic

The system supports these ticket statuses:

- Open
- In Progress
- Pending
- Resolved
- Closed

The workflow service validates status transitions so tickets move through realistic support states. For example, a ticket can move from `Open` to `In Progress`, then to `Pending`, `Resolved`, or `Closed`.

When a ticket is assigned while still open, the system automatically moves it to `In Progress`.

## 6. Comments and Internal Notes

The comment system supports two types of communication:

| Type | Description |
| --- | --- |
| Public comment | Visible to employees and support staff |
| Internal note | Visible only to IT Support Agents and Admins |

Employees can reply to tickets, while support staff can add internal troubleshooting notes.

## 7. Activity Logs and Ticket History

The system records important actions, including:

- Ticket creation
- Assignment changes
- Status changes
- Public comments
- Internal notes
- Ticket closure

These entries are shown in the frontend activity history panel for the selected ticket.

## 8. Frontend Implementation

The React frontend was extended with a workflow workspace.

Main frontend files:

| File | Purpose |
| --- | --- |
| `frontend/src/api/ticketsApi.js` | API calls for assignment, status, comments, and activity |
| `frontend/src/pages/TicketManagementPage.jsx` | Ticket table, workflow panel, comments, and timeline |
| `frontend/src/styles/app.css` | Styling for timeline, comments, activity log, and workflow controls |

## 9. Frontend Features

The ticket management screen now includes:

- Ticket table with selected workflow view.
- Assign agent dropdown for support roles.
- Status update dropdown for support roles.
- Status timeline.
- Comment and reply form.
- Internal note checkbox for support roles.
- Activity history list.
- Role-aware employee view.

## 10. Role-Based Behavior

| Role | Workflow Permissions |
| --- | --- |
| Employee | Create tickets, view public comments, add replies |
| IT Support Agent | Assign tickets, update statuses, add comments, add internal notes |
| Admin | Full workflow access |
| Manager | View ticket progress and history |

## 11. Testing Checklist

The following manual tests should be completed before submission:

- Login as Employee and create a ticket.
- Confirm Employee can add a public reply.
- Login as IT Support Agent.
- Select a ticket and assign it to an agent.
- Change ticket status from Open to In Progress.
- Add a public comment.
- Add an internal note.
- Confirm the activity history records the workflow actions.
- Confirm the ticket table updates the assigned agent, status, and comment count.

## 12. Assignment 4 Deliverables

- Ticket assignment API.
- Ticket status workflow API.
- Ticket comments and replies.
- Internal notes.
- Ticket activity logs.
- Status timeline UI.
- Workflow documentation.
