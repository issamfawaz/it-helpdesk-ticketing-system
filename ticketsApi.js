const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://localhost:5001/api";
const TICKETS_KEY = "helpdesk_demo_tickets";

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
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  }
];

function authHeaders(session) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.token}`
  };
}

function readDemoTickets() {
  const saved = localStorage.getItem(TICKETS_KEY);
  return saved ? JSON.parse(saved) : defaultTickets;
}

function writeDemoTickets(tickets) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

function normalizeTicket(ticket) {
  return {
    ...ticket,
    ticketNumber: ticket.ticketNumber ?? ticket.TicketNumber,
    createdAt: ticket.createdAt ?? ticket.CreatedAt,
    updatedAt: ticket.updatedAt ?? ticket.UpdatedAt
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

export async function getCategories(session) {
  try {
    return await apiRequest("/categories", {
      headers: authHeaders(session)
    });
  } catch {
    return defaultCategories;
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    writeDemoTickets([nextTicket, ...tickets]);
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
    const tickets = readDemoTickets();
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id !== ticketId) {
        return ticket;
      }

      return {
        ...ticket,
        title: payload.title,
        description: payload.description,
        category: category?.name ?? ticket.category,
        priority: payload.priority,
        status: payload.status,
        assignedTo: payload.assignedTo || null,
        updatedAt: new Date().toISOString()
      };
    });

    writeDemoTickets(updatedTickets);
    return updatedTickets.find((ticket) => ticket.id === ticketId);
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
    writeDemoTickets(tickets);
  }
}

