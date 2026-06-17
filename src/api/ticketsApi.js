const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://localhost:5001/api";
const TICKETS_KEY = "helpdesk_demo_tickets";
const COMMENTS_KEY = "helpdesk_demo_comments";
const ACTIVITY_KEY = "helpdesk_demo_activity";

const defaultCategories = [
  {
    id: "10000000-0000-0000-0000-000000000001",
    name: "Hardware",
    description: "Laptop, printer, monitor, and device issues"
  },
  {
    id: "10000000-0000-0000-0000-000000000002",
    name: "Software",
    description: "Application installation and software errors"
  },
  {
    id: "10000000-0000-0000-0000-000000000003",
    name: "Network",
    description: "Wi-Fi, VPN, and connectivity issues"
  },
  {
    id: "10000000-0000-0000-0000-000000000004",
    name: "Email",
    description: "Mailbox, Outlook, and email access issues"
  },
  {
    id: "10000000-0000-0000-0000-000000000005",
    name: "Access Request",
    description: "Permissions, accounts, and system access"
  },
  {
    id: "10000000-0000-0000-0000-000000000006",
    name: "Other",
    description: "General IT support requests"
  }
];

const defaultAgents = ["Adam Diab", "IT Support", "Security Team", "Network Team", "Helpdesk Admin"];

const defaultTickets = [
  {
    id: "20000000-0000-0000-0000-000000000001",
    ticketNumber: 1042,
    title: "Laptop cannot connect to office Wi-Fi",
    description: "The laptop can see the network but fails to connect after moving to the second floor.",
    category: "Network",
    priority: "High",
    status: "In Progress",
    createdBy: "Issam Fawaz",
    assignedTo: "Adam Diab",
    commentCount: 2,
    lastActivity: "Status changed from Open to In Progress.",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "20000000-0000-0000-0000-000000000002",
    ticketNumber: 1038,
    title: "Email password reset request",
    description: "Employee cannot access mailbox after password reset.",
    category: "Email",
    priority: "Medium",
    status: "Pending",
    createdBy: "Issam Fawaz",
    assignedTo: "Security Team",
    commentCount: 1,
    lastActivity: "Status changed from Open to Pending.",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "20000000-0000-0000-0000-000000000003",
    ticketNumber: 1025,
    title: "Install approved design software",
    description: "Design software installation needed for marketing work.",
    category: "Software",
    priority: "Low",
    status: "Closed",
    createdBy: "Issam Fawaz",
    assignedTo: "IT Support",
    commentCount: 0,
    lastActivity: "Ticket closed after software installation was completed.",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const defaultComments = {
  "20000000-0000-0000-0000-000000000001": [
    {
      id: "30000000-0000-0000-0000-000000000002",
      ticketId: "20000000-0000-0000-0000-000000000001",
      author: "Adam Diab",
      authorRole: "IT Support Agent",
      body: "Internal note: if the issue returns, escalate to the network team because it may be access point related.",
      isInternalNote: true,
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "30000000-0000-0000-0000-000000000001",
      ticketId: "20000000-0000-0000-0000-000000000001",
      author: "Adam Diab",
      authorRole: "IT Support Agent",
      body: "I checked the wireless profile and asked the employee to retry after reconnecting to the office network.",
      isInternalNote: false,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
    }
  ],
  "20000000-0000-0000-0000-000000000002": [
    {
      id: "30000000-0000-0000-0000-000000000003",
      ticketId: "20000000-0000-0000-0000-000000000002",
      author: "Security Team",
      authorRole: "IT Support Agent",
      body: "Password reset is waiting for identity confirmation.",
      isInternalNote: false,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    }
  ]
};

const defaultActivity = {
  "20000000-0000-0000-0000-000000000001": [
    {
      id: "40000000-0000-0000-0000-000000000003",
      ticketId: "20000000-0000-0000-0000-000000000001",
      action: "Status Changed",
      description: "Status changed from Open to In Progress.",
      actor: "Adam Diab",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "40000000-0000-0000-0000-000000000002",
      ticketId: "20000000-0000-0000-0000-000000000001",
      action: "Assignment Changed",
      description: "Ticket assigned to Adam Diab.",
      actor: "Helpdesk Admin",
      createdAt: new Date(Date.now() - 46 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "40000000-0000-0000-0000-000000000001",
      ticketId: "20000000-0000-0000-0000-000000000001",
      action: "Ticket Created",
      description: "Ticket #1042 was created by Issam Fawaz.",
      actor: "Issam Fawaz",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  "20000000-0000-0000-0000-000000000002": [
    {
      id: "40000000-0000-0000-0000-000000000004",
      ticketId: "20000000-0000-0000-0000-000000000002",
      action: "Status Changed",
      description: "Status changed from Open to Pending.",
      actor: "Security Team",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  "20000000-0000-0000-0000-000000000003": [
    {
      id: "40000000-0000-0000-0000-000000000005",
      ticketId: "20000000-0000-0000-0000-000000000003",
      action: "Ticket Closed",
      description: "Ticket closed after software installation was completed.",
      actor: "IT Support",
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]
};

function authHeaders(session) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.token}`
  };
}

function readStoredJson(key, fallback) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(fallback));
}

function writeStoredJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function readDemoTickets() {
  return readStoredJson(TICKETS_KEY, defaultTickets).map(normalizeTicket);
}

function writeDemoTickets(tickets) {
  writeStoredJson(TICKETS_KEY, tickets);
}

function readDemoComments() {
  return readStoredJson(COMMENTS_KEY, defaultComments);
}

function writeDemoComments(comments) {
  writeStoredJson(COMMENTS_KEY, comments);
}

function readDemoActivity() {
  return readStoredJson(ACTIVITY_KEY, defaultActivity);
}

function writeDemoActivity(activity) {
  writeStoredJson(ACTIVITY_KEY, activity);
}

function normalizeTicket(ticket) {
  return {
    id: ticket.id ?? ticket.Id,
    ticketNumber: ticket.ticketNumber ?? ticket.TicketNumber,
    title: ticket.title ?? ticket.Title,
    description: ticket.description ?? ticket.Description,
    category: ticket.category ?? ticket.Category,
    priority: ticket.priority ?? ticket.Priority,
    status: ticket.status ?? ticket.Status,
    createdBy: ticket.createdBy ?? ticket.CreatedBy,
    assignedTo: ticket.assignedTo ?? ticket.AssignedTo ?? null,
    commentCount: ticket.commentCount ?? ticket.CommentCount ?? 0,
    lastActivity: ticket.lastActivity ?? ticket.LastActivity ?? "No activity recorded yet.",
    createdAt: ticket.createdAt ?? ticket.CreatedAt,
    updatedAt: ticket.updatedAt ?? ticket.UpdatedAt
  };
}

function normalizeComment(comment) {
  return {
    id: comment.id ?? comment.Id,
    ticketId: comment.ticketId ?? comment.TicketId,
    author: comment.author ?? comment.Author,
    authorRole: comment.authorRole ?? comment.AuthorRole,
    body: comment.body ?? comment.Body,
    isInternalNote: comment.isInternalNote ?? comment.IsInternalNote ?? false,
    createdAt: comment.createdAt ?? comment.CreatedAt
  };
}

function normalizeActivity(activity) {
  return {
    id: activity.id ?? activity.Id,
    ticketId: activity.ticketId ?? activity.TicketId,
    action: activity.action ?? activity.Action,
    description: activity.description ?? activity.Description,
    actor: activity.actor ?? activity.Actor,
    createdAt: activity.createdAt ?? activity.CreatedAt
  };
}

async function apiRequest(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}.`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function updateStoredTicket(ticketId, updater) {
  const tickets = readDemoTickets();
  const updatedTickets = tickets.map((ticket) => {
    if (ticket.id !== ticketId) {
      return ticket;
    }

    return normalizeTicket(updater(ticket));
  });

  writeDemoTickets(updatedTickets);
  return updatedTickets.find((ticket) => ticket.id === ticketId);
}

function appendDemoActivity(ticketId, action, description, actor) {
  const activity = readDemoActivity();
  const nextActivity = {
    id: crypto.randomUUID(),
    ticketId,
    action,
    description,
    actor,
    createdAt: new Date().toISOString()
  };

  activity[ticketId] = [nextActivity, ...(activity[ticketId] ?? [])];
  writeDemoActivity(activity);

  updateStoredTicket(ticketId, (ticket) => ({
    ...ticket,
    lastActivity: description,
    updatedAt: nextActivity.createdAt
  }));

  return nextActivity;
}

export async function getCategories(session) {
  try {
    return await apiRequest("/categories", {
      headers: authHeaders(session)
    });
  } catch {
    return defaultCategories;
  }
}

export async function getAgents(session) {
  try {
    return await apiRequest("/tickets/agents", {
      headers: authHeaders(session)
    });
  } catch {
    return defaultAgents;
  }
}

export async function getTickets(session) {
  try {
    const tickets = await apiRequest("/tickets", {
      headers: authHeaders(session)
    });

    return tickets.map(normalizeTicket);
  } catch {
    return readDemoTickets();
  }
}

export async function getTicketComments(session, ticketId) {
  try {
    const comments = await apiRequest(`/tickets/${ticketId}/comments`, {
      headers: authHeaders(session)
    });

    return comments.map(normalizeComment);
  } catch {
    const canViewInternalNotes = ["Admin", "IT Support Agent"].includes(session.role);
    const comments = readDemoComments()[ticketId] ?? [];

    return comments
      .map(normalizeComment)
      .filter((comment) => canViewInternalNotes || !comment.isInternalNote);
  }
}

export async function getTicketActivity(session, ticketId) {
  try {
    const activity = await apiRequest(`/tickets/${ticketId}/activity`, {
      headers: authHeaders(session)
    });

    return activity.map(normalizeActivity);
  } catch {
    return (readDemoActivity()[ticketId] ?? []).map(normalizeActivity);
  }
}

export async function createTicket(session, payload) {
  try {
    return normalizeTicket(await apiRequest("/tickets", {
      method: "POST",
      headers: authHeaders(session),
      body: JSON.stringify(payload)
    }));
  } catch {
    const category = defaultCategories.find((item) => item.id === payload.categoryId);
    const tickets = readDemoTickets();
    const now = new Date().toISOString();
    const nextTicket = {
      id: crypto.randomUUID(),
      ticketNumber: Math.max(...tickets.map((ticket) => ticket.ticketNumber), 1000) + 1,
      title: payload.title,
      description: payload.description,
      category: category?.name ?? "Other",
      priority: payload.priority,
      status: "Open",
      createdBy: session.fullName,
      assignedTo: null,
      commentCount: 0,
      lastActivity: `Ticket was created by ${session.fullName}.`,
      createdAt: now,
      updatedAt: now
    };

    writeDemoTickets([nextTicket, ...tickets]);

    const activity = readDemoActivity();
    activity[nextTicket.id] = [
      {
        id: crypto.randomUUID(),
        ticketId: nextTicket.id,
        action: "Ticket Created",
        description: `Ticket #${nextTicket.ticketNumber} was created by ${session.fullName}.`,
        actor: session.fullName,
        createdAt: now
      }
    ];
    writeDemoActivity(activity);

    return nextTicket;
  }
}

export async function updateTicket(session, ticketId, payload) {
  try {
    return normalizeTicket(await apiRequest(`/tickets/${ticketId}`, {
      method: "PUT",
      headers: authHeaders(session),
      body: JSON.stringify(payload)
    }));
  } catch {
    const category = defaultCategories.find((item) => item.id === payload.categoryId);
    const updated = updateStoredTicket(ticketId, (ticket) => ({
      ...ticket,
      title: payload.title,
      description: payload.description,
      category: category?.name ?? ticket.category,
      priority: payload.priority,
      status: payload.status,
      assignedTo: payload.assignedTo || null,
      lastActivity: `${session.fullName} updated ticket details.`,
      updatedAt: new Date().toISOString()
    }));

    appendDemoActivity(ticketId, "Ticket Updated", `${session.fullName} updated ticket details.`, session.fullName);
    return updated;
  }
}

export async function assignTicket(session, ticketId, payload) {
  try {
    return normalizeTicket(await apiRequest(`/tickets/${ticketId}/assignment`, {
      method: "PATCH",
      headers: authHeaders(session),
      body: JSON.stringify(payload)
    }));
  } catch {
    const updated = updateStoredTicket(ticketId, (ticket) => ({
      ...ticket,
      assignedTo: payload.assignedTo,
      status: ticket.status === "Open" ? "In Progress" : ticket.status,
      lastActivity: `Ticket assigned to ${payload.assignedTo}.`,
      updatedAt: new Date().toISOString()
    }));

    appendDemoActivity(ticketId, "Assignment Changed", `Ticket assigned to ${payload.assignedTo}.`, session.fullName);

    if (updated?.status === "In Progress") {
      appendDemoActivity(ticketId, "Status Changed", "Status changed to In Progress after assignment.", session.fullName);
    }

    return readDemoTickets().find((ticket) => ticket.id === ticketId);
  }
}

export async function updateTicketStatus(session, ticketId, payload) {
  try {
    return normalizeTicket(await apiRequest(`/tickets/${ticketId}/status`, {
      method: "PATCH",
      headers: authHeaders(session),
      body: JSON.stringify(payload)
    }));
  } catch {
    const updated = updateStoredTicket(ticketId, (ticket) => ({
      ...ticket,
      status: payload.status,
      lastActivity: `Status changed to ${payload.status}.`,
      updatedAt: new Date().toISOString()
    }));

    appendDemoActivity(ticketId, "Status Changed", `Status changed to ${payload.status}.`, session.fullName);
    return updated;
  }
}

export async function addTicketComment(session, ticketId, payload) {
  try {
    return normalizeComment(await apiRequest(`/tickets/${ticketId}/comments`, {
      method: "POST",
      headers: authHeaders(session),
      body: JSON.stringify(payload)
    }));
  } catch {
    const comments = readDemoComments();
    const now = new Date().toISOString();
    const nextComment = {
      id: crypto.randomUUID(),
      ticketId,
      author: session.fullName,
      authorRole: session.role,
      body: payload.body,
      isInternalNote: payload.isInternalNote,
      createdAt: now
    };

    comments[ticketId] = [nextComment, ...(comments[ticketId] ?? [])];
    writeDemoComments(comments);

    updateStoredTicket(ticketId, (ticket) => ({
      ...ticket,
      commentCount: (ticket.commentCount ?? 0) + 1,
      lastActivity: `${session.fullName} added ${payload.isInternalNote ? "an internal note" : "a comment"}.`,
      updatedAt: now
    }));

    appendDemoActivity(
      ticketId,
      payload.isInternalNote ? "Internal Note Added" : "Comment Added",
      `${session.fullName} added ${payload.isInternalNote ? "an internal note" : "a comment"}.`,
      session.fullName
    );

    return nextComment;
  }
}

export async function deleteTicket(session, ticketId) {
  try {
    await apiRequest(`/tickets/${ticketId}`, {
      method: "DELETE",
      headers: authHeaders(session)
    });
  } catch {
    const tickets = readDemoTickets().filter((ticket) => ticket.id !== ticketId);
    const comments = readDemoComments();
    const activity = readDemoActivity();

    delete comments[ticketId];
    delete activity[ticketId];

    writeDemoTickets(tickets);
    writeDemoComments(comments);
    writeDemoActivity(activity);
  }
}
