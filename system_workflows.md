# System Workflow Diagrams

Project: IT Helpdesk Ticketing System

Team: Issam Fawaz and Adam Diab

## 1. Ticket Submission Workflow

```mermaid
flowchart TD
    A[Employee logs in] --> B[Open Create Ticket page]
    B --> C[Enter title, description, category, priority]
    C --> D{Attachment needed?}
    D -->|Yes| E[Upload attachment]
    D -->|No| F[Submit ticket]
    E --> F
    F --> G[System validates required fields]
    G --> H{Valid ticket?}
    H -->|No| I[Show validation errors]
    I --> C
    H -->|Yes| J[Save ticket as Open]
    J --> K[Create activity log]
    K --> L[Show confirmation and ticket number]
```

## 2. Ticket Assignment and Triage Workflow

```mermaid
flowchart TD
    A[New ticket created] --> B[Agent or manager views open queue]
    B --> C[Review category, description, priority]
    C --> D{Enough information?}
    D -->|No| E[Set status to Pending]
    E --> F[Add public comment asking for details]
    F --> G[Employee replies]
    G --> C
    D -->|Yes| H[Assign support team or agent]
    H --> I[Set priority and status]
    I --> J[System records assignment activity]
    J --> K[Ticket appears in assigned agent dashboard]
```

## 3. Ticket Resolution and Closure Workflow

```mermaid
flowchart TD
    A[Agent opens assigned ticket] --> B[Investigate issue]
    B --> C[Add notes or public comment]
    C --> D{Issue solved?}
    D -->|No| E[Keep status In Progress]
    E --> B
    D -->|Needs employee input| F[Set status Pending]
    F --> G[Employee provides details]
    G --> B
    D -->|Yes| H[Set status Resolved]
    H --> I[Add resolution comment]
    I --> J[Employee reviews solution]
    J --> K{Employee accepts?}
    K -->|No| L[Reopen ticket]
    L --> B
    K -->|Yes| M[Close ticket]
    M --> N[System records closure activity]
```

## 4. High-Level User Role Workflow

```mermaid
flowchart LR
    Employee[Employee] -->|Creates and tracks tickets| TicketSystem[IT Helpdesk System]
    Agent[Support Agent] -->|Triage, updates, resolves| TicketSystem
    Manager[Manager] -->|Monitors team tickets and reports| TicketSystem
    Admin[Admin] -->|Manages users and setup data| TicketSystem
    TicketSystem --> Database[(PostgreSQL Database)]
```
