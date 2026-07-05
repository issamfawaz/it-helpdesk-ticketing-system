const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
const HAS_API_BASE_URL = Boolean(API_BASE_URL);
const TICKETS_KEY = "helpdesk_demo_tickets";
const COMMENTS_KEY = "helpdesk_demo_comments";
const ACTIVITY_KEY = "helpdesk_demo_activity";
const ATTACHMENTS_KEY = "helpdesk_demo_attachments";
const NOTIFICATIONS_KEY = "helpdesk_demo_notifications";

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
    attachmentCount: 1,
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
    attachmentCount: 1,
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
    attachmentCount: 0,
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

const defaultAttachments = {
  "20000000-0000-0000-0000-000000000001": [
    {
      id: "50000000-0000-0000-0000-000000000001",
      ticketId: "20000000-0000-0000-0000-000000000001",
      fileName: "wifi-error-screenshot.png",
      fileSize: 348200,
      contentType: "image/png",
      uploadedBy: "Issam Fawaz",
      uploadedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
    }
  ],
  "20000000-0000-0000-0000-000000000002": [
    {
      id: "50000000-0000-0000-0000-000000000002",
      ticketId: "20000000-0000-0000-0000-000000000002",
      fileName: "mailbox-error-log.txt",
      fileSize: 42700,
      contentType: "text/plain",
      uploadedBy: "Security Team",
      uploadedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    }
  ]
};

const defaultNotifications = [
  {
    id: "60000000-0000-0000-0000-000000000001",
    ticketId: "20000000-0000-0000-0000-000000000001",
    title: "High priority ticket assigned",
    message: "Ticket #1042 is assigned to Adam Diab and is currently in progress.",
    type: "Assignment",
    isRead: false,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "60000000-0000-0000-0000-000000000002",
    ticketId: "20000000-0000-0000-0000-000000000002",
    title: "Ticket waiting for confirmation",
    message: "Ticket #1038 is pending identity confirmation before password reset.",
    type: "Status",
    isRead: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "60000000-0000-0000-0000-000000000003",
    ticketId: "20000000-0000-0000-0000-000000000003",
    title: "Ticket closed",
    message: "Ticket #1025 was closed after software installation was completed.",
    type: "Resolution",
    isRead: true,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  }
];

function authHeaders(session) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.token}`
  };
}

function readStoredJson(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(fallback));
  } catch {
    localStorage.removeItem(key);
    return JSON.parse(JSON.stringify(fallback));
  }
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

function readDemoAttachments() {
  return readStoredJson(ATTACHMENTS_KEY, defaultAttachments);
}

function writeDemoAttachments(attachments) {
  writeStoredJson(ATTACHMENTS_KEY, attachments);
}

function readDemoNotifications() {
  return readStoredJson(NOTIFICATIONS_KEY, defaultNotifications).map(normalizeNotification);
}

function writeDemoNotifications(notifications) {
  writeStoredJson(NOTIFICATIONS_KEY, notifications);
}

export function resetDemoData() {
  [
    TICKETS_KEY,
    COMMENTS_KEY,
    ACTIVITY_KEY,
    ATTACHMENTS_KEY,
    NOTIFICATIONS_KEY
  ].forEach((key) => localStorage.removeItem(key));
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
    attachmentCount: ticket.attachmentCount ?? ticket.AttachmentCount ?? 0,
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

function normalizeAttachment(attachment) {
  return {
    id: attachment.id ?? attachment.Id,
    ticketId: attachment.ticketId ?? attachment.TicketId,
    fileName: attachment.fileName ?? attachment.FileName,
    fileSize: attachment.fileSize ?? attachment.FileSize,
    contentType: attachment.contentType ?? attachment.ContentType,
    uploadedBy: attachment.uploadedBy ?? attachment.UploadedBy,
    uploadedAt: attachment.uploadedAt ?? attachment.UploadedAt
  };
}

function normalizeNotification(notification) {
  return {
    id: notification.id ?? notification.Id,
    ticketId: notification.ticketId ?? notification.TicketId ?? null,
    title: notification.title ?? notification.Title,
    message: notification.message ?? notification.Message,
    type: notification.type ?? notification.Type,
    isRead: notification.isRead ?? notification.IsRead ?? false,
    createdAt: notification.createdAt ?? notification.CreatedAt
  };
}

function buildSlices(tickets, field, knownValues) {
  return knownValues
    .map((name) => ({
      name,
      value: tickets.filter((ticket) => ticket[field] === name).length
    }))
    .filter((slice) => slice.value > 0);
}

function buildDemoDashboard() {
  const tickets = readDemoTickets();
  const attachments = readDemoAttachments();
  const notifications = readDemoNotifications();
  const agents = defaultAgents;

  return {
    totalTickets: tickets.length,
    openTickets: tickets.filter((ticket) => ticket.status === "Open").length,
    pendingTickets: tickets.filter((ticket) => ticket.status === "Pending").length,
    resolvedTickets: tickets.filter((ticket) => ["Resolved", "Closed"].includes(ticket.status)).length,
    criticalTickets: tickets.filter((ticket) => ticket.priority === "Critical").length,
    attachmentCount: Object.values(attachments).flat().length,
    unreadNotifications: notifications.filter((notification) => !notification.isRead).length,
    ticketsByStatus: buildSlices(tickets, "status", ["Open", "In Progress", "Pending", "Resolved", "Closed"]),
    ticketsByCategory: buildSlices(tickets, "category", defaultCategories.map((category) => category.name)),
    ticketsByPriority: buildSlices(tickets, "priority", ["Low", "Medium", "High", "Critical"]),
    agentWorkload: agents.map((agent) => ({
      agent,
      assignedTickets: tickets.filter((ticket) => ticket.assignedTo === agent && ticket.status !== "Closed").length,
      resolvedTickets: tickets.filter((ticket) => ticket.assignedTo === agent && ["Resolved", "Closed"].includes(ticket.status)).length
    }))
  };
}

function detectDemoCategory(text) {
  const normalized = text.toLowerCase();

  if (includesAny(normalized, [
    "wifi",
    "wi-fi",
    "internet",
    "vpn",
    "network",
    "connection",
    "no connection",
    "router",
    "switch",
    "ethernet",
    "lan",
    "dns",
    "proxy",
    "firewall",
    "ip address",
    "server",
    "offline",
    "outage"
  ])) {
    return "Network";
  }

  if (includesAny(normalized, [
    "email",
    "e-mail",
    "outlook",
    "mailbox",
    "inbox",
    "calendar",
    "meeting invite",
    "smtp",
    "imap",
    "mail"
  ])) {
    return "Email";
  }

  if (includesAny(normalized, [
    "password",
    "permission",
    "login",
    "log in",
    "sign in",
    "signin",
    "access",
    "account locked",
    "user account",
    "compromised account",
    "new account",
    "locked",
    "mfa",
    "2fa",
    "role",
    "approval"
  ])) {
    return "Access Request";
  }

  if (includesAny(normalized, [
    "laptop",
    "desktop",
    "pc",
    "computer",
    "printer",
    "monitor",
    "mouse",
    "keyboard",
    "scanner",
    "headset",
    "hardware",
    "device",
    "battery",
    "charger",
    "screen",
    "blue screen"
  ])) {
    return "Hardware";
  }

  if (includesAny(normalized, [
    "software",
    "install",
    "application",
    "app",
    "program",
    "crash",
    "error",
    "bug",
    "license",
    "update",
    "version",
    "excel",
    "word",
    "browser",
    "chrome"
  ])) {
    return "Software";
  }

  return "Other";
}

function includesAny(text, phrases) {
  return phrases.some((phrase) => text.includes(phrase));
}

function detectDemoPriority(text) {
  const normalized = text.toLowerCase();
  const broadImpact = includesAny(normalized, [
    "all users",
    "everyone",
    "whole company",
    "entire company",
    "company-wide",
    "department cannot",
    "whole department",
    "office cannot",
    "whole office",
    "entire office",
    "multiple users",
    "many users",
    "staff cannot",
    "team cannot"
  ]);
  const outageSignals = includesAny(normalized, [
    "server down",
    "server is down",
    "main server",
    "outage",
    "production",
    "offline",
    "service down",
    "system down",
    "system offline",
    "network down",
    "internet down",
    "no internet",
    "wifi down",
    "wi-fi down",
    "email down",
    "mail server down",
    "database down",
    "website down",
    "application down"
  ]);
  const securitySignals = includesAny(normalized, [
    "security breach",
    "ransomware",
    "data leak",
    "hacked",
    "phishing",
    "malware",
    "virus",
    "compromised account",
    "unauthorized access"
  ]);
  const blockedUserSignals = includesAny(normalized, [
    "no internet",
    "internet not working",
    "network not working",
    "wifi not working",
    "wi-fi not working",
    "cannot connect",
    "can't connect",
    "unable to connect",
    "fails to connect",
    "no connection",
    "vpn not working",
    "vpn failed",
    "email down",
    "outlook not working",
    "cannot send email",
    "cannot receive email",
    "cannot login",
    "can't login",
    "cannot log in",
    "can't log in",
    "cannot sign in",
    "can't sign in",
    "cannot access",
    "can't access",
    "no access",
    "account locked",
    "locked out",
    "laptop won't turn on",
    "computer won't start",
    "printer down",
    "cannot print",
    "cannot work",
    "blocked",
    "urgent"
  ]);
  const plannedOrLowSignals = includesAny(normalized, [
    "install request",
    "installation request",
    "please install",
    "install software",
    "software request",
    "access request",
    "new user setup",
    "new employee",
    "minor",
    "question",
    "how do i",
    "how to",
    "can i",
    "need software",
    "need approved",
    "when possible",
    "not urgent",
    "low priority"
  ]);

  if (
    (broadImpact && outageSignals) ||
    securitySignals ||
    includesAny(normalized, [
      "production server",
      "main server is offline",
      "main server down",
      "company system down",
      "critical system down"
    ])
  ) {
    return "Critical";
  }

  if (blockedUserSignals) {
    return "High";
  }

  if (plannedOrLowSignals) {
    return "Low";
  }

  return "Medium";
}

function buildDemoSuggestions(category, priority) {
  const closingStep = priority === "Critical"
    ? "Escalate to the support lead immediately and document the timeline."
    : "Update the ticket status and add a customer-facing reply after each support step.";

  const categorySteps = {
    Network: [
      "Confirm whether the network issue is isolated to one device, one floor, or multiple users.",
      "Check Wi-Fi profile, VPN status, adapter state, and recent access point alerts.",
      "If more than one user is affected, assign the ticket to Network Team."
    ],
    Email: [
      "Test webmail first to separate account issues from Outlook profile issues.",
      "Check password state, mailbox access, client errors, and recent policy changes.",
      "If authentication fails across webmail and Outlook, route to Security Team."
    ],
    "Access Request": [
      "Verify the employee identity and confirm manager approval before changing access.",
      "Check account lock status, assigned roles, group membership, and recent permission changes.",
      "Add an internal note with the approval source before resolving."
    ],
    Hardware: [
      "Request a photo, screenshot, or asset tag before dispatching replacement hardware.",
      "Check power, cables, drivers, device health, and whether a loaner is required.",
      "Escalate to onsite support if the user is blocked from working."
    ],
    Software: [
      "Collect the exact error message, application version, and reproduction steps.",
      "Check whether the app is approved, licensed, and already installed on similar devices.",
      "Try repair or reinstall only after confirming the impact and preserving user data."
    ],
    Other: [
      "Ask for clear reproduction steps and the affected device or system.",
      "Collect screenshots, logs, user impact, and deadline details.",
      "Reclassify the ticket once enough evidence is collected."
    ]
  };

  return [...(categorySteps[category] ?? categorySteps.Other), closingStep];
}

function buildDemoImpact(category, priority) {
  const priorityPrefix = priority === "Critical"
    ? "Business-critical impact"
    : priority === "High"
      ? "User is likely blocked or strongly affected"
      : priority === "Low"
        ? "Low operational impact"
        : "Moderate support impact";

  const categoryImpact = {
    Network: "connectivity may prevent access to internal systems or cloud tools",
    Email: "mailbox access may block communication and approvals",
    "Access Request": "permissions may prevent the employee from completing assigned work",
    Hardware: "device reliability may reduce or block productivity",
    Software: "application availability may affect the requested workflow",
    Other: "more information is needed before final routing"
  };

  return `${priorityPrefix}: ${categoryImpact[category] ?? categoryImpact.Other}.`;
}

function buildDemoOwner(category) {
  const owners = {
    Network: "Network Team",
    Email: "Security Team",
    "Access Request": "Helpdesk Admin",
    Hardware: "Onsite Support",
    Software: "IT Support",
    Other: "Helpdesk Triage"
  };

  return owners[category] ?? owners.Other;
}

function findDemoEvidence(text) {
  const normalized = text.toLowerCase();
  const indicators = [
    "wifi",
    "wi-fi",
    "vpn",
    "network",
    "email",
    "outlook",
    "password",
    "access",
    "laptop",
    "printer",
    "software",
    "install",
    "urgent",
    "blocked",
    "server",
    "outage",
    "security breach",
    "ransomware",
    "phishing",
    "malware",
    "no internet",
    "cannot access",
    "account locked",
    "cannot connect",
    "cannot login",
    "cannot print",
    "not working",
    "offline"
  ];

  return indicators.filter((indicator) => normalized.includes(indicator)).slice(0, 5);
}

function buildDemoAiAnalysis(payload) {
  const text = `${payload.title ?? payload.Title ?? ""} ${payload.description ?? payload.Description ?? ""}`;
  const category = detectDemoCategory(text);
  const priority = detectDemoPriority(text);
  const title = payload.title ?? payload.Title ?? "This ticket";
  const evidence = findDemoEvidence(text);
  const recommendedOwner = buildDemoOwner(category);
  const troubleshootingSuggestions = buildDemoSuggestions(category, priority);
  const confidence = priority === "Critical" ? 0.94 : evidence.length >= 2 ? 0.9 : 0.82;

  return {
    suggestedCategory: category,
    suggestedPriority: priority,
    recommendedOwner,
    summary: `The request "${title}" should be handled as a ${category} ticket with ${priority} priority. Assign ownership to ${recommendedOwner}, collect evidence, and keep the ticket updated until the user confirms the issue is resolved.`,
    impact: buildDemoImpact(category, priority),
    urgencyReason: priority === "Critical"
      ? "Critical because the language suggests a possible service outage or company-wide impact."
      : priority === "High"
        ? "High because the ticket suggests the user may be blocked from normal work."
        : priority === "Low"
          ? "Low because the request appears planned or non-blocking."
          : "Medium because the issue needs support action but does not show outage-level impact.",
    troubleshootingSuggestions,
    nextActions: troubleshootingSuggestions,
    escalationNote: priority === "Critical" || priority === "High"
      ? `Escalate to ${recommendedOwner} if the first validation step confirms the impact.`
      : `Keep ownership with ${recommendedOwner} unless new evidence shows broader impact.`,
    evidence: evidence.length > 0 ? evidence : ["No strong keyword evidence; collect more details from the requester"],
    explanation: `Detected ${category} routing signals and estimated ${priority} urgency from the ticket title and description.`,
    confidence
  };
}

function buildReportCsv() {
  const rows = ["TicketNumber,Title,Category,Priority,Status,AssignedTo,CreatedBy,UpdatedAt"];

  for (const ticket of readDemoTickets()) {
    rows.push([
      ticket.ticketNumber,
      `"${ticket.title.replaceAll("\"", "\"\"")}"`,
      `"${ticket.category}"`,
      `"${ticket.priority}"`,
      `"${ticket.status}"`,
      `"${ticket.assignedTo ?? "Unassigned"}"`,
      `"${ticket.createdBy}"`,
      `"${ticket.updatedAt}"`
    ].join(","));
  }

  return rows.join("\n");
}

function buildReportHtml() {
  const dashboard = buildDemoDashboard();
  const rows = readDemoTickets()
    .map((ticket) => `
      <tr>
        <td>${ticket.ticketNumber}</td>
        <td>${ticket.title}</td>
        <td>${ticket.category}</td>
        <td>${ticket.priority}</td>
        <td>${ticket.status}</td>
        <td>${ticket.assignedTo ?? "Unassigned"}</td>
      </tr>
    `)
    .join("");

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Helpdesk Report</title>
        <style>
          body { font-family: Arial, sans-serif; color: #172033; margin: 32px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #d9e0ea; padding: 8px; text-align: left; font-size: 13px; }
          th { background: #f5f7fb; }
          .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 18px 0; }
          .kpi { border: 1px solid #d9e0ea; padding: 12px; border-radius: 8px; }
          .kpi span { display: block; color: #637083; font-size: 12px; }
          .kpi strong { font-size: 26px; }
        </style>
      </head>
      <body>
        <h1>IT Helpdesk Ticket Report</h1>
        <section class="kpis">
          <article class="kpi"><span>Total Tickets</span><strong>${dashboard.totalTickets}</strong></article>
          <article class="kpi"><span>Open</span><strong>${dashboard.openTickets}</strong></article>
          <article class="kpi"><span>Pending</span><strong>${dashboard.pendingTickets}</strong></article>
          <article class="kpi"><span>Resolved/Closed</span><strong>${dashboard.resolvedTickets}</strong></article>
        </section>
        <table>
          <thead><tr><th>#</th><th>Title</th><th>Category</th><th>Priority</th><th>Status</th><th>Assigned</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </body>
    </html>
  `;
}

async function apiRequest(path, options) {
  if (!HAS_API_BASE_URL) {
    throw new Error("API base URL is not configured.");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}.`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function fileRequest(path, options) {
  if (!HAS_API_BASE_URL) {
    throw new Error("API base URL is not configured.");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(`File request failed with status ${response.status}.`);
  }

  return response.blob();
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

function appendDemoNotification(ticketId, title, message, type) {
  const notifications = readDemoNotifications();
  const nextNotification = {
    id: crypto.randomUUID(),
    ticketId,
    title,
    message,
    type,
    isRead: false,
    createdAt: new Date().toISOString()
  };

  writeDemoNotifications([nextNotification, ...notifications]);
  return nextNotification;
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

export async function getDashboardAnalytics(session) {
  try {
    return await apiRequest("/tickets/dashboard", {
      headers: authHeaders(session)
    });
  } catch {
    return buildDemoDashboard();
  }
}

export async function exportReport(session, format) {
  try {
    const blob = await fileRequest(`/reports/export/${format}`, {
      headers: {
        Authorization: `Bearer ${session.token}`
      }
    });

    return {
      blob,
      fileName: format === "excel" ? "helpdesk-report.csv" : "helpdesk-report.html",
      format
    };
  } catch {
    const isExcel = format === "excel";
    return {
      blob: new Blob([isExcel ? buildReportCsv() : buildReportHtml()], {
        type: isExcel ? "text/csv" : "text/html"
      }),
      fileName: isExcel ? "helpdesk-report.csv" : "helpdesk-report.html",
      format
    };
  }
}

export async function analyzeTicketDraft(session, payload) {
  try {
    return await apiRequest("/ai/analyze-ticket", {
      method: "POST",
      headers: authHeaders(session),
      body: JSON.stringify({
        title: payload.title,
        description: payload.description
      })
    });
  } catch {
    return buildDemoAiAnalysis(payload);
  }
}

export async function askAiAssistant(session, payload) {
  try {
    return await apiRequest("/ai/chat", {
      method: "POST",
      headers: authHeaders(session),
      body: JSON.stringify(payload)
    });
  } catch {
    const category = payload.category ?? detectDemoCategory(`${payload.ticketTitle ?? ""} ${payload.ticketDescription ?? ""} ${payload.message}`);
    const priority = detectDemoPriority(`${payload.ticketTitle ?? ""} ${payload.ticketDescription ?? ""} ${payload.message}`);
    const owner = buildDemoOwner(category);
    return {
      reply: `Recommended handling: classify this as ${category}, keep priority around ${priority}, and route ownership to ${owner}. Start by confirming impact, collecting evidence, and posting a clear user-facing update.`,
      suggestedActions: buildDemoSuggestions(category, priority)
    };
  }
}

export async function getNotifications(session) {
  try {
    const notifications = await apiRequest("/notifications", {
      headers: authHeaders(session)
    });

    return notifications.map(normalizeNotification);
  } catch {
    return readDemoNotifications();
  }
}

export async function markNotificationRead(session, notificationId) {
  try {
    return normalizeNotification(await apiRequest(`/notifications/${notificationId}/read`, {
      method: "PATCH",
      headers: authHeaders(session)
    }));
  } catch {
    const notifications = readDemoNotifications().map((notification) =>
      notification.id === notificationId ? { ...notification, isRead: true } : notification
    );

    writeDemoNotifications(notifications);
    return notifications.find((notification) => notification.id === notificationId);
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

export async function getTicketAttachments(session, ticketId) {
  try {
    const attachments = await apiRequest(`/tickets/${ticketId}/attachments`, {
      headers: authHeaders(session)
    });

    return attachments.map(normalizeAttachment);
  } catch {
    return (readDemoAttachments()[ticketId] ?? []).map(normalizeAttachment);
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
      attachmentCount: 0,
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
    appendDemoNotification(
      nextTicket.id,
      "New support ticket",
      `Ticket #${nextTicket.ticketNumber} was created by ${session.fullName}.`,
      "Ticket"
    );

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
    appendDemoNotification(ticketId, "Ticket updated", `${session.fullName} updated a ticket.`, "Ticket");
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
    appendDemoNotification(ticketId, "Ticket assigned", `Ticket was assigned to ${payload.assignedTo}.`, "Assignment");

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
    appendDemoNotification(ticketId, "Ticket status changed", `Status changed to ${payload.status}.`, "Status");
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
    appendDemoNotification(
      ticketId,
      payload.isInternalNote ? "Internal note added" : "Comment added",
      `${session.fullName} added ${payload.isInternalNote ? "an internal note" : "a comment"}.`,
      "Comment"
    );

    return nextComment;
  }
}

export async function uploadTicketAttachment(session, ticketId, file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    return normalizeAttachment(await apiRequest(`/tickets/${ticketId}/attachments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.token}`
      },
      body: formData
    }));
  } catch {
    const attachments = readDemoAttachments();
    const now = new Date().toISOString();
    const nextAttachment = {
      id: crypto.randomUUID(),
      ticketId,
      fileName: file.name,
      fileSize: file.size,
      contentType: file.type || "application/octet-stream",
      uploadedBy: session.fullName,
      uploadedAt: now
    };

    attachments[ticketId] = [nextAttachment, ...(attachments[ticketId] ?? [])];
    writeDemoAttachments(attachments);

    updateStoredTicket(ticketId, (ticket) => ({
      ...ticket,
      attachmentCount: (ticket.attachmentCount ?? 0) + 1,
      lastActivity: `${session.fullName} uploaded ${file.name}.`,
      updatedAt: now
    }));

    appendDemoActivity(ticketId, "Attachment Added", `${session.fullName} uploaded ${file.name}.`, session.fullName);
    appendDemoNotification(ticketId, "Attachment uploaded", `${session.fullName} uploaded ${file.name}.`, "Attachment");

    return nextAttachment;
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
    const attachments = readDemoAttachments();

    delete comments[ticketId];
    delete activity[ticketId];
    delete attachments[ticketId];

    writeDemoTickets(tickets);
    writeDemoComments(comments);
    writeDemoActivity(activity);
    writeDemoAttachments(attachments);
  }
}
