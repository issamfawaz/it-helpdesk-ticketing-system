# IT Helpdesk Ticketing System

IDS Internship full stack web development project

Team:
- Issam Fawaz
- Adam Diab

Repository:
https://github.com/issamfawaz/it-helpdesk-ticketing-system

## Project Summary

This project is an internal IT Helpdesk Ticketing System. It lets employees submit IT issues, lets support agents triage and resolve those issues, gives managers reporting visibility, and gives admins a place to manage users, teams, departments, and categories.

This repository contains the planning deliverables for Assignment 1 and the initial project setup for Assignment 2.

## Chosen Stack

| Layer | Technology |
| --- | --- |
| Frontend | React.js |
| Backend | ASP.NET Core Web API |
| Database | PostgreSQL |
| Source control | GitHub |

## What To Review

| Deliverable | File |
| --- | --- |
| Full assignment report | `docs/IDS_Assignment1_Report.html` |
| Project proposal | `docs/project_proposal.md` |
| Frontend component and route plan | `docs/frontend_component_plan.md` |
| Workflow diagrams | `diagrams/system_workflows.md` |
| Application architecture diagram | `diagrams/application_architecture.mmd` |
| ERD diagram | `diagrams/erd.mmd` |
| PostgreSQL schema | `database/schema.sql` |
| UI wireframes | `wireframes/wireframes.html` |
| Assignment 2 report | `docs/assignment2_report.md` |
| ASP.NET Core API setup | `backend/Helpdesk.Api` |
| React frontend setup | `frontend` |

Database naming note: the SQL schema uses PascalCase table and column names, such as `Tickets`, `TicketComments`, `TicketId`, and `CreatedAt`, as requested by the instructor.

## Suggested Repository Structure

```text
it-helpdesk-ticketing-system/
  backend/
    Helpdesk.Api/
  frontend/
    src/
  database/
    schema.sql
  diagrams/
    application_architecture.mmd
    erd.mmd
    system_workflows.md
  docs/
    IDS_Assignment1_Report.html
    assignment2_report.md
    frontend_component_plan.md
    project_proposal.md
  wireframes/
    wireframes.html
  README.md
```

## Assignment 1 Checklist

- Project scope defined
- Requirements gathered
- Project proposal prepared
- Workflow diagrams prepared
- UI wireframes prepared
- PostgreSQL database schema and seed/sample data designed
- ERD diagram prepared
- Application architecture planned
- GitHub repository link included

## Assignment 2 Checklist

- React project setup included
- ASP.NET Core Web API setup included
- PostgreSQL connection configured
- JWT authentication structure included
- Login/index pages included
- Role-based authorization policies included
- Demo accounts documented
