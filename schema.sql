-- IDS Internship Assignment 1
-- Project: IT Help Desk & Ticketing Management System
-- Team: Issam Fawaz and Adam Diab
-- Database: PostgreSQL
-- Naming convention: PascalCase table and column names.
-- PostgreSQL requires double quotes to preserve PascalCase identifiers.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "Roles" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "Name" VARCHAR(50) NOT NULL UNIQUE,
    "Description" TEXT,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "Departments" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "Name" VARCHAR(100) NOT NULL UNIQUE,
    "Description" TEXT,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "Users" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "RoleId" UUID NOT NULL REFERENCES "Roles"("Id") ON DELETE RESTRICT,
    "DepartmentId" UUID REFERENCES "Departments"("Id") ON DELETE SET NULL,
    "FullName" VARCHAR(150) NOT NULL,
    "Email" VARCHAR(255) NOT NULL UNIQUE,
    "PasswordHash" VARCHAR(255) NOT NULL,
    "Phone" VARCHAR(30),
    "JobTitle" VARCHAR(100),
    "IsActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "LastLoginAt" TIMESTAMPTZ,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "SupportTeams" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "Name" VARCHAR(120) NOT NULL UNIQUE,
    "Description" TEXT,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "TeamMembers" (
    "TeamId" UUID NOT NULL REFERENCES "SupportTeams"("Id") ON DELETE CASCADE,
    "UserId" UUID NOT NULL REFERENCES "Users"("Id") ON DELETE CASCADE,
    "MemberRole" VARCHAR(50) NOT NULL DEFAULT 'member',
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY ("TeamId", "UserId")
);

CREATE TABLE "Categories" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "DefaultTeamId" UUID REFERENCES "SupportTeams"("Id") ON DELETE SET NULL,
    "Name" VARCHAR(120) NOT NULL UNIQUE,
    "Description" TEXT,
    "IsActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "Priorities" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "Name" VARCHAR(50) NOT NULL UNIQUE,
    "SortOrder" INTEGER NOT NULL UNIQUE,
    "ResponseTargetHours" INTEGER,
    "IsActive" BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE "Statuses" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "Name" VARCHAR(50) NOT NULL UNIQUE,
    "SortOrder" INTEGER NOT NULL UNIQUE,
    "IsTerminal" BOOLEAN NOT NULL DEFAULT FALSE,
    "IsActive" BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE "Tickets" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "TicketNumber" BIGINT GENERATED ALWAYS AS IDENTITY UNIQUE,
    "RequesterId" UUID NOT NULL REFERENCES "Users"("Id") ON DELETE RESTRICT,
    "CategoryId" UUID NOT NULL REFERENCES "Categories"("Id") ON DELETE RESTRICT,
    "PriorityId" UUID NOT NULL REFERENCES "Priorities"("Id") ON DELETE RESTRICT,
    "StatusId" UUID NOT NULL REFERENCES "Statuses"("Id") ON DELETE RESTRICT,
    "AssignedTeamId" UUID REFERENCES "SupportTeams"("Id") ON DELETE SET NULL,
    "AssignedToUserId" UUID REFERENCES "Users"("Id") ON DELETE SET NULL,
    "Title" VARCHAR(180) NOT NULL,
    "Description" TEXT NOT NULL,
    "CancellationReason" TEXT,
    "DueAt" TIMESTAMPTZ,
    "ResolvedAt" TIMESTAMPTZ,
    "ClosedAt" TIMESTAMPTZ,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "TicketAssignmentHistory" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "TicketId" UUID NOT NULL REFERENCES "Tickets"("Id") ON DELETE CASCADE,
    "AssignedTeamId" UUID REFERENCES "SupportTeams"("Id") ON DELETE SET NULL,
    "AssignedToUserId" UUID REFERENCES "Users"("Id") ON DELETE SET NULL,
    "AssignedByUserId" UUID REFERENCES "Users"("Id") ON DELETE SET NULL,
    "Note" TEXT,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "TicketComments" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "TicketId" UUID NOT NULL REFERENCES "Tickets"("Id") ON DELETE CASCADE,
    "AuthorId" UUID NOT NULL REFERENCES "Users"("Id") ON DELETE RESTRICT,
    "Body" TEXT NOT NULL,
    "IsInternal" BOOLEAN NOT NULL DEFAULT FALSE,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "TicketAttachments" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "TicketId" UUID NOT NULL REFERENCES "Tickets"("Id") ON DELETE CASCADE,
    "UploadedByUserId" UUID REFERENCES "Users"("Id") ON DELETE SET NULL,
    "FileName" VARCHAR(255) NOT NULL,
    "FileUrl" TEXT NOT NULL,
    "ContentType" VARCHAR(120),
    "FileSizeBytes" BIGINT,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "Notifications" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "UserId" UUID NOT NULL REFERENCES "Users"("Id") ON DELETE CASCADE,
    "TicketId" UUID REFERENCES "Tickets"("Id") ON DELETE CASCADE,
    "Title" VARCHAR(160) NOT NULL,
    "Message" TEXT NOT NULL,
    "IsRead" BOOLEAN NOT NULL DEFAULT FALSE,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "ReadAt" TIMESTAMPTZ
);

CREATE TABLE "KnowledgeBaseArticles" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "CategoryId" UUID REFERENCES "Categories"("Id") ON DELETE SET NULL,
    "AuthorId" UUID REFERENCES "Users"("Id") ON DELETE SET NULL,
    "Title" VARCHAR(180) NOT NULL,
    "Content" TEXT NOT NULL,
    "IsPublished" BOOLEAN NOT NULL DEFAULT FALSE,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "AISuggestions" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "TicketId" UUID NOT NULL REFERENCES "Tickets"("Id") ON DELETE CASCADE,
    "SuggestedCategoryId" UUID REFERENCES "Categories"("Id") ON DELETE SET NULL,
    "SuggestedPriorityId" UUID REFERENCES "Priorities"("Id") ON DELETE SET NULL,
    "SuggestedReply" TEXT,
    "ConfidenceScore" NUMERIC(5, 4),
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "ActivityLogs" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "TicketId" UUID REFERENCES "Tickets"("Id") ON DELETE CASCADE,
    "ActorUserId" UUID REFERENCES "Users"("Id") ON DELETE SET NULL,
    "Action" VARCHAR(80) NOT NULL,
    "OldValue" TEXT,
    "NewValue" TEXT,
    "Note" TEXT,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX "IXUsersRoleId" ON "Users"("RoleId");
CREATE INDEX "IXUsersDepartmentId" ON "Users"("DepartmentId");

CREATE INDEX "IXTeamMembersUserId" ON "TeamMembers"("UserId");

CREATE INDEX "IXCategoriesDefaultTeamId" ON "Categories"("DefaultTeamId");

CREATE INDEX "IXTicketsRequesterId" ON "Tickets"("RequesterId");
CREATE INDEX "IXTicketsCategoryId" ON "Tickets"("CategoryId");
CREATE INDEX "IXTicketsPriorityId" ON "Tickets"("PriorityId");
CREATE INDEX "IXTicketsStatusId" ON "Tickets"("StatusId");
CREATE INDEX "IXTicketsAssignedTeamId" ON "Tickets"("AssignedTeamId");
CREATE INDEX "IXTicketsAssignedToUserId" ON "Tickets"("AssignedToUserId");
CREATE INDEX "IXTicketsCreatedAt" ON "Tickets"("CreatedAt");

CREATE INDEX "IXTicketAssignmentHistoryTicketId" ON "TicketAssignmentHistory"("TicketId");
CREATE INDEX "IXTicketCommentsTicketId" ON "TicketComments"("TicketId");
CREATE INDEX "IXTicketCommentsAuthorId" ON "TicketComments"("AuthorId");
CREATE INDEX "IXTicketAttachmentsTicketId" ON "TicketAttachments"("TicketId");

CREATE INDEX "IXNotificationsUserId" ON "Notifications"("UserId");
CREATE INDEX "IXNotificationsTicketId" ON "Notifications"("TicketId");
CREATE INDEX "IXNotificationsIsRead" ON "Notifications"("IsRead");

CREATE INDEX "IXKnowledgeBaseArticlesCategoryId" ON "KnowledgeBaseArticles"("CategoryId");
CREATE INDEX "IXAISuggestionsTicketId" ON "AISuggestions"("TicketId");
CREATE INDEX "IXActivityLogsTicketId" ON "ActivityLogs"("TicketId");
CREATE INDEX "IXActivityLogsActorUserId" ON "ActivityLogs"("ActorUserId");

-- Seed/sample data for the Week 1 database design deliverable.

INSERT INTO "Roles" ("Id", "Name", "Description") VALUES
    ('00000000-0000-0000-0000-000000000001', 'Admin', 'Full system access'),
    ('00000000-0000-0000-0000-000000000002', 'IT Support Agent', 'Manage and resolve tickets'),
    ('00000000-0000-0000-0000-000000000003', 'Employee', 'Create and track tickets'),
    ('00000000-0000-0000-0000-000000000004', 'Manager', 'Monitor team tickets and reports');

INSERT INTO "Priorities" ("Id", "Name", "SortOrder", "ResponseTargetHours") VALUES
    ('00000000-0000-0000-0000-000000000011', 'Low', 1, 72),
    ('00000000-0000-0000-0000-000000000012', 'Medium', 2, 48),
    ('00000000-0000-0000-0000-000000000013', 'High', 3, 24),
    ('00000000-0000-0000-0000-000000000014', 'Critical', 4, 4);

INSERT INTO "Statuses" ("Id", "Name", "SortOrder", "IsTerminal") VALUES
    ('00000000-0000-0000-0000-000000000021', 'Open', 1, FALSE),
    ('00000000-0000-0000-0000-000000000022', 'In Progress', 2, FALSE),
    ('00000000-0000-0000-0000-000000000023', 'Pending', 3, FALSE),
    ('00000000-0000-0000-0000-000000000024', 'Resolved', 4, FALSE),
    ('00000000-0000-0000-0000-000000000025', 'Closed', 5, TRUE);

INSERT INTO "Departments" ("Id", "Name", "Description") VALUES
    ('00000000-0000-0000-0000-000000000031', 'IT', 'Information technology department'),
    ('00000000-0000-0000-0000-000000000032', 'Operations', 'Internal business operations'),
    ('00000000-0000-0000-0000-000000000033', 'HR', 'Human resources');

INSERT INTO "SupportTeams" ("Id", "Name", "Description") VALUES
    ('00000000-0000-0000-0000-000000000041', 'IT Support', 'General support and hardware issues'),
    ('00000000-0000-0000-0000-000000000042', 'Network Team', 'Network, VPN, and connectivity issues'),
    ('00000000-0000-0000-0000-000000000043', 'Security Team', 'Accounts, permissions, and access requests');

INSERT INTO "Categories" ("Id", "DefaultTeamId", "Name", "Description") VALUES
    ('00000000-0000-0000-0000-000000000051', '00000000-0000-0000-0000-000000000041', 'Hardware', 'Laptop, printer, monitor, or device issues'),
    ('00000000-0000-0000-0000-000000000052', '00000000-0000-0000-0000-000000000041', 'Software', 'Application installation or software errors'),
    ('00000000-0000-0000-0000-000000000053', '00000000-0000-0000-0000-000000000042', 'Network', 'Wi-Fi, VPN, and connectivity issues'),
    ('00000000-0000-0000-0000-000000000054', '00000000-0000-0000-0000-000000000043', 'Email', 'Email access and mailbox issues'),
    ('00000000-0000-0000-0000-000000000055', '00000000-0000-0000-0000-000000000043', 'Access Request', 'Permissions, accounts, and system access'),
    ('00000000-0000-0000-0000-000000000056', '00000000-0000-0000-0000-000000000041', 'Other', 'General IT support');

