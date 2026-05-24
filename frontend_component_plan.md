# Frontend Component and Route Plan

Project: IT Helpdesk Ticketing System

Team: Issam Fawaz and Adam Diab

## Purpose

This document connects the UI wireframes to the future React.js implementation. The goal is to make the screen names, routes, and component names understandable before coding starts.

## Route Plan

| Route | Page Component | Main Users | Purpose |
| --- | --- | --- | --- |
| `/login` | `AuthLoginPage` | All users | Sign in and enter the system based on role. |
| `/register` | `AuthRegisterPage` | Employee | Optional registration page if self-registration is enabled. |
| `/employee/tickets` | `EmployeeTicketListPage` | Employee | Show the employee's submitted tickets and status summary. |
| `/employee/tickets/new` | `TicketCreatePage` | Employee | Submit a new IT support request. |
| `/tickets/:ticketId` | `TicketDetailPage` | Employee, Agent, Manager, Admin | Show one ticket, comments, status, assignment, and history. |
| `/agent/queue` | `AgentQueuePage` | Agent | Show assigned tickets, unassigned queue, and critical work. |
| `/manager/reports` | `ManagerReportsPage` | Manager | Monitor team tickets, reports, and performance summaries. |
| `/notifications` | `NotificationsPage` | All users | Show ticket updates and assigned work alerts. |
| `/profile` | `UserProfilePage` | All users | Manage profile information and password reset flow. |
| `/knowledge-base` | `KnowledgeBasePage` | All users | Search FAQ and troubleshooting articles. |
| `/admin` | `AdminConsolePage` | Admin | Manage users, departments, teams, and categories. |

## Page Components

### `AuthLoginPage`

Responsibility:
- Displays the login form.
- Sends credentials to `/api/auth/login`.
- Redirects users based on role.

Uses:
- `AuthLayout`
- `LoginForm`
- `TextInput`
- `PrimaryButton`

### `AuthRegisterPage`

Responsibility:
- Allows employee registration if the company enables self-registration.
- Validates password rules before sending the request to the API.
- Can be disabled if admins create users manually.

Uses:
- `AuthLayout`
- `RegisterForm`
- `TextInput`
- `PasswordStrengthHint`
- `PrimaryButton`

### `EmployeeTicketListPage`

Responsibility:
- Shows the employee's ticket statistics.
- Lists submitted tickets.
- Allows filtering by status, priority, and date.

Uses:
- `AppShell`
- `RoleSidebar`
- `TopNavigation`
- `TicketSummaryCards`
- `TicketFilters`
- `TicketTable`
- `TicketStatusBadge`
- `PriorityBadge`

### `TicketCreatePage`

Responsibility:
- Lets an employee create a ticket.
- Validates required fields before sending data to the API.
- Supports optional file attachment.

Uses:
- `AppShell`
- `TicketCreateForm`
- `CategorySelect`
- `PrioritySelect`
- `AttachmentDropzone`
- `FormActions`

### `TicketDetailPage`

Responsibility:
- Shows the full ticket conversation and current properties.
- Allows replies, internal notes, status updates, and assignment changes depending on role.
- Shows the ticket activity timeline.

Uses:
- `AppShell`
- `TicketHeader`
- `TicketThread`
- `CommentComposer`
- `TicketPropertiesPanel`
- `ActivityTimeline`
- `TicketStatusBadge`
- `PriorityBadge`

### `AgentQueuePage`

Responsibility:
- Helps support agents find what needs attention first.
- Separates assigned tickets, unassigned tickets, critical tickets, and pending tickets.
- Provides quick actions such as open, assign, and reply.

Uses:
- `AppShell`
- `RoleSidebar`
- `AgentQueueTabs`
- `AgentWorkloadSummary`
- `TicketFilters`
- `TicketTable`
- `QuickActionButton`

### `ManagerReportsPage`

Responsibility:
- Gives managers visibility into team ticket workload.
- Shows open, pending, resolved, and critical ticket counts.
- Includes charts for tickets by category, priority, and agent.

Uses:
- `AppShell`
- `ReportSummaryCards`
- `TicketsByCategoryChart`
- `TicketsByPriorityChart`
- `AgentPerformanceTable`
- `ExportReportButton`

### `NotificationsPage`

Responsibility:
- Shows ticket updates, assignment alerts, mentions, and status changes.
- Allows users to mark notifications as read.

Uses:
- `AppShell`
- `NotificationList`
- `NotificationItem`
- `EmptyState`

### `KnowledgeBasePage`

Responsibility:
- Lets employees search articles before creating a ticket.
- Supports category-based FAQ and troubleshooting articles.
- Can later connect to an AI chat assistant.

Uses:
- `AppShell`
- `KnowledgeSearch`
- `ArticleList`
- `ArticleDetails`
- `CategoryFilter`

### `AdminConsolePage`

Responsibility:
- Allows admins to manage setup data.
- Keeps users, departments, support teams, and categories organized.

Uses:
- `AppShell`
- `AdminSectionTabs`
- `AdminDataTable`
- `UserRoleBadge`
- `EntityFormDrawer`
- `CategoryTeamMappingList`

## Shared Component Names

| Component | Used For |
| --- | --- |
| `AppShell` | Main authenticated layout with top navigation and sidebar. |
| `AuthLayout` | Login layout before the user is authenticated. |
| `TopNavigation` | Product name, search field, and signed-in user role. |
| `RoleSidebar` | Navigation that changes based on employee, agent, manager, or admin role. |
| `TicketSummaryCards` | Small count cards for ticket status totals. |
| `TicketFilters` | Status, priority, category, and sorting controls. |
| `TicketTable` | Reusable ticket list table. |
| `TicketStatusBadge` | Visual label for Open, In Progress, Pending, Resolved, or Closed. |
| `PriorityBadge` | Visual label for Low, Medium, High, or Critical. |
| `TicketCreateForm` | Form used to create a new ticket. |
| `AttachmentDropzone` | Upload area for screenshots or files. |
| `TicketThread` | Public comments and internal notes for a ticket. |
| `CommentComposer` | Reply box for adding a new comment. |
| `TicketPropertiesPanel` | Side panel showing employee, assignee, category, and dates. |
| `ActivityTimeline` | Ticket history such as created, assigned, status changed, and closed. |
| `NotificationList` | User notification center for ticket updates and mentions. |
| `ReportSummaryCards` | Dashboard metrics for managers and admins. |
| `KnowledgeSearch` | Search input for FAQ and troubleshooting articles. |
| `AdminDataTable` | Reusable table for admin users, departments, teams, and categories. |

## Suggested Frontend Folder Structure

```text
frontend/src/
  app/
    App.tsx
    routes.tsx
  components/
    badges/
      PriorityBadge.tsx
      TicketStatusBadge.tsx
      UserRoleBadge.tsx
    charts/
      AgentPerformanceTable.tsx
      TicketsByCategoryChart.tsx
      TicketsByPriorityChart.tsx
    forms/
      AttachmentDropzone.tsx
      CommentComposer.tsx
      RegisterForm.tsx
      TicketCreateForm.tsx
    knowledge-base/
      ArticleDetails.tsx
      ArticleList.tsx
      KnowledgeSearch.tsx
    layout/
      AppShell.tsx
      AuthLayout.tsx
      RoleSidebar.tsx
      TopNavigation.tsx
    notifications/
      NotificationItem.tsx
      NotificationList.tsx
    reports/
      ExportReportButton.tsx
      ReportSummaryCards.tsx
    tickets/
      ActivityTimeline.tsx
      TicketFilters.tsx
      TicketPropertiesPanel.tsx
      TicketSummaryCards.tsx
      TicketTable.tsx
      TicketThread.tsx
  pages/
    admin/
      AdminConsolePage.tsx
    agent/
      AgentQueuePage.tsx
    auth/
      AuthLoginPage.tsx
      AuthRegisterPage.tsx
    knowledge-base/
      KnowledgeBasePage.tsx
    manager/
      ManagerReportsPage.tsx
    notifications/
      NotificationsPage.tsx
    employee/
      EmployeeTicketListPage.tsx
      TicketCreatePage.tsx
    tickets/
      TicketDetailPage.tsx
  services/
    apiClient.ts
    authApi.ts
    ticketsApi.ts
    adminApi.ts
    notificationsApi.ts
    reportsApi.ts
  types/
    ticket.ts
    user.ts
```

## Initial React Types

```ts
export type TicketStatus =
  | "open"
  | "in_progress"
  | "pending"
  | "resolved"
  | "closed";

export type TicketPriority = "low" | "medium" | "high" | "critical";

export interface TicketListItem {
  id: string;
  ticketNumber: number;
  title: string;
  status: TicketStatus;
  priority: TicketPriority;
  employeeName: string;
  assignedToName?: string;
  categoryName?: string;
  updatedAt: string;
}
```

## Notes for Implementation

- Start with the shared `AppShell`, because most authenticated screens use the same layout.
- Build `TicketStatusBadge` and `PriorityBadge` early because they appear in every ticket screen.
- Keep ticket list data in a typed model so the same `TicketTable` can be reused by employee, agent, manager, and admin views.
- Use role-based route guards so employees cannot open admin pages.
- Keep internal notes visually different from public comments in `TicketThread`.
