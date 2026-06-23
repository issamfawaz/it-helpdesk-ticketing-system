# IDS Internship Assignment 5 - Dashboard Analytics, Notifications, and File Attachments

Project: IT Helpdesk Ticketing System

Team members:
- Issam Fawaz
- Adam Diab

## 1. Assignment 5 Objective

Assignment 5 focuses on improving the support dashboard by adding analytics, notifications, and file attachments. The goal is to help support agents and administrators monitor ticket activity, track important KPIs, receive ticket updates, and attach screenshots or documents to tickets.

## 2. Completed Scope

The following requirements were implemented:

- Statistics dashboard.
- KPI cards for ticket counts and attachment totals.
- Chart-style analytics for status, category, priority, and agent workload.
- Notification center.
- Read/unread notification handling.
- Screenshot/document attachment upload.
- Attachment metadata tracking.
- Activity log entries for uploaded attachments.

## 3. Backend Implementation

The ASP.NET Core Web API was extended with dashboard, notification, and attachment functionality.

Main backend files:

| File | Purpose |
| --- | --- |
| `backend/Helpdesk.Api/Controllers/TicketsController.cs` | Dashboard and attachment API routes |
| `backend/Helpdesk.Api/Controllers/NotificationsController.cs` | Notification center API routes |
| `backend/Helpdesk.Api/Services/ITicketService.cs` | Service contract for analytics, notifications, and attachments |
| `backend/Helpdesk.Api/Services/InMemoryTicketService.cs` | In-memory implementation and sample data |
| `backend/Helpdesk.Api/Models/TicketDtos.cs` | Dashboard, notification, and attachment DTOs |
| `backend/Helpdesk.Api/Models/TicketRecord.cs` | Attachment and notification records |

## 4. Backend API Routes

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/tickets/dashboard` | Return dashboard KPI and chart data |
| GET | `/api/notifications` | Return notification center items |
| PATCH | `/api/notifications/{id}/read` | Mark a notification as read |
| GET | `/api/tickets/{id}/attachments` | Return ticket attachments |
| POST | `/api/tickets/{id}/attachments` | Upload ticket screenshot/document |

## 5. Dashboard Analytics

The dashboard returns these KPI values:

- Total tickets
- Open tickets
- Pending tickets
- Resolved/closed tickets
- Critical tickets
- Attachment count
- Unread notification count

The dashboard also includes chart data for:

- Tickets by status
- Tickets by category
- Tickets by priority
- Agent workload

## 6. Notifications

Notifications are created when important ticket actions happen, including:

- New ticket created
- Ticket updated
- Ticket assigned
- Ticket status changed
- Comment or internal note added
- Attachment uploaded

The frontend notification center shows unread notifications and allows users to mark notifications as read.

## 7. File Attachments

The attachment feature supports screenshot and document upload metadata.

Supported file types:

- PNG
- JPG/JPEG
- PDF
- TXT
- DOC/DOCX

Validation rules:

- File is required.
- File size must be 5 MB or less.
- Unsupported file types are rejected.

The current implementation stores attachment metadata in memory for the assignment demo. Permanent secure file storage can be added in a later deployment milestone.

## 8. Frontend Implementation

The React frontend now includes:

- KPI cards.
- Chart-style analytics blocks.
- Notification center.
- Read/unread notification behavior.
- Attachment upload input.
- Attachment list for the selected ticket.
- Updated ticket table attachment count.

Main frontend files:

| File | Purpose |
| --- | --- |
| `frontend/src/api/ticketsApi.js` | API calls and local fallback data |
| `frontend/src/pages/TicketManagementPage.jsx` | Dashboard, notifications, workflow, and attachment UI |
| `frontend/src/styles/app.css` | Dashboard, chart, notification, and attachment styling |

## 9. Testing Checklist

Manual tests:

- Login with a demo account.
- Confirm KPI cards load.
- Confirm chart blocks show ticket analytics.
- Confirm notification center shows read/unread items.
- Click `Mark read` on a notification.
- Select a ticket.
- Upload a supported attachment file.
- Confirm the attachment appears in the selected ticket.
- Confirm the ticket file count updates.
- Confirm activity history records the attachment upload.

## 10. Assignment 5 Deliverables

- Dashboard analytics API.
- KPI cards and chart UI.
- Notification center API.
- Read/unread notification behavior.
- Ticket attachment API.
- Screenshot/document upload UI.
- Assignment 5 documentation.
