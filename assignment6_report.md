# IDS Internship Assignment 6 - Reports Export and AI Features

Project: IT Helpdesk Ticketing System

Team members:
- Issam Fawaz
- Adam Diab

## 1. Assignment 6 Objective

Assignment 6 focuses on reporting and AI-assisted helpdesk features. The goal is to export ticket reports and add AI features that help classify tickets, recommend priority, summarize issues, suggest troubleshooting steps, and answer support questions.

## 2. Completed Scope

The following requirements were implemented:

- Reports export system.
- Excel-compatible CSV export.
- Printable PDF report view.
- AI ticket categorization.
- AI priority detection.
- AI-generated ticket summaries.
- AI troubleshooting suggestions.
- AI chatbot assistant.
- Knowledge-base style support responses.

## 3. Backend Implementation

The ASP.NET Core Web API was extended with reports and AI endpoints.

Main backend files:

| File | Purpose |
| --- | --- |
| `backend/Helpdesk.Api/Controllers/ReportsController.cs` | Report summary and export endpoints |
| `backend/Helpdesk.Api/Controllers/AiController.cs` | AI analysis and assistant endpoints |
| `backend/Helpdesk.Api/Services/IHelpdeskAiService.cs` | AI service contract |
| `backend/Helpdesk.Api/Services/DemoHelpdeskAiService.cs` | Demo AI implementation |
| `backend/Helpdesk.Api/Models/AiDtos.cs` | AI request and response DTOs |
| `backend/Helpdesk.Api/Program.cs` | Service registration |

## 4. Backend API Routes

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/reports/summary` | Return report summary analytics |
| GET | `/api/reports/export/excel` | Export tickets as Excel-compatible CSV |
| GET | `/api/reports/export/pdf` | Export printable report view |
| POST | `/api/ai/analyze-ticket` | Suggest category, priority, summary, and troubleshooting steps |
| POST | `/api/ai/chat` | Return assistant response and suggested actions |

## 5. Reports Export

The report system supports:

- Ticket list export.
- KPI summary export.
- Excel-compatible CSV report download.
- Printable report view that can be saved as PDF from the browser.

The report includes:

- Ticket number
- Title
- Category
- Priority
- Status
- Assigned agent/team
- Created by
- Last update time

## 6. AI Features

The AI assistant supports:

| Feature | Description |
| --- | --- |
| Ticket categorization | Recommends Hardware, Software, Network, Email, Access Request, or Other |
| Priority detection | Recommends Low, Medium, High, or Critical |
| Ticket summary | Generates a short issue summary |
| Troubleshooting suggestions | Returns support steps based on category and priority |
| Chatbot assistant | Answers support questions using ticket context |

## 7. AI Integration Approach

The current implementation uses a demo AI service inside the backend so the project can run without external API keys during the internship review.

The architecture is prepared so the demo service can later be replaced with:

- OpenAI API
- Azure OpenAI Service
- Ollama local models

The frontend calls the AI endpoints through the same API layer used for tickets, reports, notifications, and attachments.

## 8. Frontend Implementation

The React frontend now includes:

- Report export center.
- Export PDF button.
- Export Excel button.
- AI analyze button on the ticket form.
- AI summary button for the selected ticket.
- AI suggestion card with category, priority, confidence, and troubleshooting steps.
- AI assistant chat form.

Main frontend files:

| File | Purpose |
| --- | --- |
| `frontend/src/api/ticketsApi.js` | Report export and AI API calls |
| `frontend/src/pages/TicketManagementPage.jsx` | Report and AI UI |
| `frontend/src/styles/app.css` | Report and AI styling |

## 9. Testing Checklist

Manual tests:

- Login as IT Support Agent.
- Create or select a ticket.
- Click `AI analyze` on a ticket draft.
- Confirm category and priority are suggested.
- Click `AI summary` on the selected ticket.
- Confirm summary and troubleshooting steps appear.
- Ask the AI assistant a support question.
- Click `Export Excel` and confirm the CSV report downloads.
- Click `Export PDF` and confirm the printable report view opens.

## 10. Assignment 6 Deliverables

- Reports API.
- PDF/print report export.
- Excel-compatible export.
- AI ticket categorization.
- AI priority recommendation.
- AI-generated summaries.
- AI troubleshooting suggestions.
- AI chatbot assistant.
- Assignment 6 documentation.
