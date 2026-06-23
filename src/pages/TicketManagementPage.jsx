import { useEffect, useMemo, useState } from "react";
import {
  addTicketComment,
  assignTicket,
  createTicket,
  deleteTicket,
  getAgents,
  getCategories,
  getDashboardAnalytics,
  getNotifications,
  getTicketActivity,
  getTicketAttachments,
  getTicketComments,
  getTickets,
  markNotificationRead,
  updateTicket,
  updateTicketStatus,
  uploadTicketAttachment
} from "../api/ticketsApi.js";

const emptyForm = {
  title: "",
  description: "",
  categoryId: "",
  priority: "Medium",
  status: "Open",
  assignedTo: ""
};

const emptyCommentForm = {
  body: "",
  isInternalNote: false
};

const priorities = ["Low", "Medium", "High", "Critical"];
const statuses = ["Open", "In Progress", "Pending", "Resolved", "Closed"];
const allowedAttachmentTypes = [".png", ".jpg", ".jpeg", ".pdf", ".txt", ".doc", ".docx"];

export default function TicketManagementPage({ session }) {
  const [tickets, setTickets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [agents, setAgents] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [commentForm, setCommentForm] = useState(emptyCommentForm);
  const [comments, setComments] = useState([]);
  const [activity, setActivity] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [editingTicketId, setEditingTicketId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWorkflowLoading, setIsWorkflowLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [workflowMessage, setWorkflowMessage] = useState("");

  const canManageTickets = ["Admin", "IT Support Agent"].includes(session.role);

  const selectedTicket = useMemo(() => {
    return tickets.find((ticket) => ticket.id === selectedTicketId) ?? tickets[0] ?? null;
  }, [selectedTicketId, tickets]);

  const agentOptions = useMemo(() => {
    const currentAssignee = selectedTicket?.assignedTo ? [selectedTicket.assignedTo] : [];
    return [...new Set([...currentAssignee, ...agents])];
  }, [agents, selectedTicket]);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const [nextCategories, nextTickets, nextAgents, nextDashboard, nextNotifications] = await Promise.all([
        getCategories(session),
        getTickets(session),
        getAgents(session),
        getDashboardAnalytics(session),
        getNotifications(session)
      ]);

      setCategories(nextCategories);
      setTickets(nextTickets);
      setAgents(nextAgents);
      setDashboard(nextDashboard);
      setNotifications(nextNotifications);
      setForm((currentForm) => ({
        ...currentForm,
        categoryId: nextCategories[0]?.id ?? ""
      }));
      setSelectedTicketId((currentId) => {
        const stillExists = nextTickets.some((ticket) => ticket.id === currentId);
        return stillExists ? currentId : nextTickets[0]?.id ?? null;
      });
      setIsLoading(false);
    }

    loadData();
  }, [session]);

  useEffect(() => {
    if (!selectedTicketId) {
      setComments([]);
      setActivity([]);
      setAttachments([]);
      return;
    }

    loadWorkflowForTicket(selectedTicketId);
  }, [selectedTicketId, session]);

  const summary = useMemo(() => {
    return {
      open: tickets.filter((ticket) => ticket.status === "Open").length,
      inProgress: tickets.filter((ticket) => ticket.status === "In Progress").length,
      pending: tickets.filter((ticket) => ticket.status === "Pending").length,
      closed: tickets.filter((ticket) => ticket.status === "Closed").length
    };
  }, [tickets]);

  async function refreshDashboardData() {
    const [nextDashboard, nextNotifications] = await Promise.all([
      getDashboardAnalytics(session),
      getNotifications(session)
    ]);

    setDashboard(nextDashboard);
    setNotifications(nextNotifications);
  }

  async function loadWorkflowForTicket(ticketId) {
    setIsWorkflowLoading(true);
    const [nextComments, nextActivity, nextAttachments] = await Promise.all([
      getTicketComments(session, ticketId),
      getTicketActivity(session, ticketId),
      getTicketAttachments(session, ticketId)
    ]);

    setComments(nextComments);
    setActivity(nextActivity);
    setAttachments(nextAttachments);
    setIsWorkflowLoading(false);
  }

  function updateForm(field, value) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  }

  function updateCommentForm(field, value) {
    setCommentForm((currentForm) => ({ ...currentForm, [field]: value }));
  }

  function mergeTicket(updatedTicket) {
    if (!updatedTicket) {
      return;
    }

    setTickets((currentTickets) =>
      currentTickets.map((ticket) => (ticket.id === updatedTicket.id ? updatedTicket : ticket))
    );
    setSelectedTicketId(updatedTicket.id);
  }

  function startEdit(ticket) {
    const category = categories.find((item) => item.name === ticket.category);

    setEditingTicketId(ticket.id);
    setSelectedTicketId(ticket.id);
    setForm({
      title: ticket.title,
      description: ticket.description,
      categoryId: category?.id ?? categories[0]?.id ?? "",
      priority: ticket.priority,
      status: ticket.status,
      assignedTo: ticket.assignedTo ?? ""
    });
    setMessage("");
  }

  function resetForm() {
    setEditingTicketId(null);
    setForm({
      ...emptyForm,
      categoryId: categories[0]?.id ?? ""
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!form.title.trim() || !form.description.trim()) {
      setMessage("Title and description are required.");
      return;
    }

    if (editingTicketId) {
      const updated = await updateTicket(session, editingTicketId, form);
      mergeTicket(updated);
      setMessage("Ticket updated successfully.");
      resetForm();
      await loadWorkflowForTicket(editingTicketId);
      await refreshDashboardData();
      return;
    }

    const created = await createTicket(session, form);
    setTickets((currentTickets) => [created, ...currentTickets]);
    setSelectedTicketId(created.id);
    setMessage("Ticket created successfully.");
    resetForm();
    await refreshDashboardData();
  }

  async function handleDelete(ticketId) {
    await deleteTicket(session, ticketId);
    const remainingTickets = tickets.filter((ticket) => ticket.id !== ticketId);

    setTickets(remainingTickets);
    setSelectedTicketId((currentId) => {
      if (currentId !== ticketId) {
        return currentId;
      }

      return remainingTickets[0]?.id ?? null;
    });
    setMessage("Ticket deleted successfully.");
    await refreshDashboardData();
  }

  async function handleAssign(assignedTo) {
    if (!selectedTicket || !assignedTo) {
      return;
    }

    const updated = await assignTicket(session, selectedTicket.id, { assignedTo });
    mergeTicket(updated);
    setWorkflowMessage(`Ticket assigned to ${assignedTo}.`);
    await loadWorkflowForTicket(selectedTicket.id);
    await refreshDashboardData();
  }

  async function handleStatusChange(status) {
    if (!selectedTicket) {
      return;
    }

    const updated = await updateTicketStatus(session, selectedTicket.id, { status });
    mergeTicket(updated);
    setWorkflowMessage(`Status updated to ${status}.`);
    await loadWorkflowForTicket(selectedTicket.id);
    await refreshDashboardData();
  }

  async function handleAddComment(event) {
    event.preventDefault();

    if (!selectedTicket || !commentForm.body.trim()) {
      setWorkflowMessage("Comment body is required.");
      return;
    }

    const created = await addTicketComment(session, selectedTicket.id, {
      body: commentForm.body,
      isInternalNote: canManageTickets ? commentForm.isInternalNote : false
    });

    setComments((currentComments) => [created, ...currentComments]);
    setTickets((currentTickets) =>
      currentTickets.map((ticket) =>
        ticket.id === selectedTicket.id
          ? {
              ...ticket,
              commentCount: (ticket.commentCount ?? 0) + 1,
              lastActivity: `${session.fullName} added ${created.isInternalNote ? "an internal note" : "a comment"}.`,
              updatedAt: created.createdAt
            }
          : ticket
      )
    );
    setCommentForm(emptyCommentForm);
    setWorkflowMessage(created.isInternalNote ? "Internal note added." : "Comment added.");
    await loadWorkflowForTicket(selectedTicket.id);
    await refreshDashboardData();
  }

  async function handleUploadAttachment(event) {
    const file = event.target.files?.[0];

    if (!selectedTicket || !file) {
      return;
    }

    const fileName = file.name.toLowerCase();
    const isAllowedType = allowedAttachmentTypes.some((extension) => fileName.endsWith(extension));

    if (!isAllowedType) {
      setWorkflowMessage("Unsupported file type. Use PNG, JPG, PDF, TXT, DOC, or DOCX.");
      event.target.value = "";
      return;
    }

    if (file.size > 5_000_000) {
      setWorkflowMessage("Attachment must be 5 MB or less.");
      event.target.value = "";
      return;
    }

    const uploaded = await uploadTicketAttachment(session, selectedTicket.id, file);
    setAttachments((currentAttachments) => [uploaded, ...currentAttachments]);
    setTickets((currentTickets) =>
      currentTickets.map((ticket) =>
        ticket.id === selectedTicket.id
          ? {
              ...ticket,
              attachmentCount: (ticket.attachmentCount ?? 0) + 1,
              lastActivity: `${session.fullName} uploaded ${uploaded.fileName}.`,
              updatedAt: uploaded.uploadedAt
            }
          : ticket
      )
    );
    setWorkflowMessage("Attachment uploaded.");
    event.target.value = "";
    await loadWorkflowForTicket(selectedTicket.id);
    await refreshDashboardData();
  }

  async function handleMarkNotificationRead(notificationId) {
    const updated = await markNotificationRead(session, notificationId);

    if (!updated) {
      return;
    }

    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === notificationId ? updated : notification
      )
    );
    setDashboard((currentDashboard) =>
      currentDashboard
        ? {
            ...currentDashboard,
            unreadNotifications: Math.max(currentDashboard.unreadNotifications - 1, 0)
          }
        : currentDashboard
    );
  }

  function formatDate(value) {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(value));
  }

  function formatFileSize(bytes) {
    if (bytes >= 1_000_000) {
      return `${(bytes / 1_000_000).toFixed(1)} MB`;
    }

    return `${Math.max(1, Math.round(bytes / 1000))} KB`;
  }

  if (isLoading) {
    return <section className="content-panel">Loading tickets...</section>;
  }

  return (
    <section className="ticket-workspace">
      <div className="ticket-header">
        <div>
          <span className="eyebrow">Dashboard analytics and support operations</span>
          <h2>Ticket Management</h2>
          <p>
            Track KPIs, upload attachments, review notifications, assign tickets, update statuses,
            and audit support activity from one helpdesk workspace.
          </p>
        </div>
        <div className="ticket-summary">
          <span>Open: {summary.open}</span>
          <span>In Progress: {summary.inProgress}</span>
          <span>Pending: {summary.pending}</span>
          <span>Closed: {summary.closed}</span>
        </div>
      </div>

      {dashboard ? (
        <DashboardAnalyticsPanel
          dashboard={dashboard}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          formatDate={formatDate}
        />
      ) : null}

      <div className="ticket-grid">
        <form className="ticket-form" onSubmit={handleSubmit}>
          <h3>{editingTicketId ? "Edit ticket" : "Create ticket"}</h3>

          <label>
            Title
            <input
              value={form.title}
              onChange={(event) => updateForm("title", event.target.value)}
              placeholder="Example: Laptop cannot connect to Wi-Fi"
            />
          </label>

          <label>
            Description
            <textarea
              value={form.description}
              onChange={(event) => updateForm("description", event.target.value)}
              placeholder="Describe the issue, device, error message, and when it started."
              rows={5}
            />
          </label>

          <div className="form-row">
            <label>
              Category
              <select
                value={form.categoryId}
                onChange={(event) => updateForm("categoryId", event.target.value)}
              >
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Priority
              <select
                value={form.priority}
                onChange={(event) => updateForm("priority", event.target.value)}
              >
                {priorities.map((priority) => (
                  <option value={priority} key={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {editingTicketId ? (
            <div className="form-row">
              <label>
                Status
                <select
                  value={form.status}
                  onChange={(event) => updateForm("status", event.target.value)}
                >
                  {statuses.map((status) => (
                    <option value={status} key={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Assigned to
                <input
                  value={form.assignedTo}
                  onChange={(event) => updateForm("assignedTo", event.target.value)}
                  placeholder="Agent or team"
                />
              </label>
            </div>
          ) : null}

          {message ? <p className="form-message">{message}</p> : null}

          <div className="form-actions">
            <button type="submit">{editingTicketId ? "Update ticket" : "Create ticket"}</button>
            {editingTicketId ? (
              <button className="secondary-button" type="button" onClick={resetForm}>
                Cancel
              </button>
            ) : null}
          </div>
        </form>

        <div className="ticket-table-panel">
          <div className="table-title-row">
            <h3>Tickets</h3>
            <span>{tickets.length} total</span>
          </div>

          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assigned</th>
                  <th>Files</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr className={ticket.id === selectedTicket?.id ? "selected-row" : ""} key={ticket.id}>
                    <td>#{ticket.ticketNumber}</td>
                    <td>{ticket.title}</td>
                    <td>{ticket.category}</td>
                    <td>
                      <span className={`priority-tag ${ticket.priority.toLowerCase()}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td>{ticket.status}</td>
                    <td>{ticket.assignedTo ?? "Unassigned"}</td>
                    <td>{ticket.attachmentCount ?? 0}</td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="secondary-action"
                          type="button"
                          onClick={() => setSelectedTicketId(ticket.id)}
                        >
                          Workflow
                        </button>
                        {canManageTickets ? (
                          <>
                            <button type="button" onClick={() => startEdit(ticket)}>
                              Edit
                            </button>
                            <button
                              className="danger-button"
                              type="button"
                              onClick={() => handleDelete(ticket.id)}
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          <span className="muted-text">View only</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedTicket ? (
            <div className="workflow-panel">
              <div className="workflow-header">
                <div>
                  <span className="eyebrow">Selected ticket #{selectedTicket.ticketNumber}</span>
                  <h3>{selectedTicket.title}</h3>
                  <p>{selectedTicket.lastActivity}</p>
                </div>
                <span className={`status-pill ${selectedTicket.status.toLowerCase().replaceAll(" ", "-")}`}>
                  {selectedTicket.status}
                </span>
              </div>

              <div className="status-timeline">
                {statuses.map((status) => {
                  const currentIndex = statuses.indexOf(selectedTicket.status);
                  const itemIndex = statuses.indexOf(status);

                  return (
                    <span
                      className={`timeline-step ${itemIndex <= currentIndex ? "active" : ""}`}
                      key={status}
                    >
                      {status}
                    </span>
                  );
                })}
              </div>

              {canManageTickets ? (
                <div className="workflow-controls">
                  <label>
                    Assign agent
                    <select
                      value={selectedTicket.assignedTo ?? ""}
                      onChange={(event) => handleAssign(event.target.value)}
                    >
                      <option value="" disabled>
                        Select agent
                      </option>
                      {agentOptions.map((agent) => (
                        <option value={agent} key={agent}>
                          {agent}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Update status
                    <select
                      value={selectedTicket.status}
                      onChange={(event) => handleStatusChange(event.target.value)}
                    >
                      {statuses.map((status) => (
                        <option value={status} key={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              ) : null}

              {workflowMessage ? <p className="form-message">{workflowMessage}</p> : null}

              <div className="workflow-columns">
                <div className="workflow-column">
                  <h4>Comments and replies</h4>
                  <form className="comment-form" onSubmit={handleAddComment}>
                    <textarea
                      value={commentForm.body}
                      onChange={(event) => updateCommentForm("body", event.target.value)}
                      placeholder="Add a reply or support note"
                      rows={3}
                    />
                    <div className="comment-actions">
                      {canManageTickets ? (
                        <label className="checkbox-row">
                          <input
                            type="checkbox"
                            checked={commentForm.isInternalNote}
                            onChange={(event) => updateCommentForm("isInternalNote", event.target.checked)}
                          />
                          Internal note
                        </label>
                      ) : null}
                      <button type="submit">Add comment</button>
                    </div>
                  </form>

                  <div className="comment-list">
                    {comments.length === 0 ? (
                      <p className="muted-text">No comments yet.</p>
                    ) : (
                      comments.map((comment) => (
                        <article
                          className={`comment-item ${comment.isInternalNote ? "internal-note" : ""}`}
                          key={comment.id}
                        >
                          <div className="comment-meta">
                            <strong>{comment.author}</strong>
                            <span>{comment.authorRole}</span>
                            <span>{formatDate(comment.createdAt)}</span>
                          </div>
                          <p>{comment.body}</p>
                        </article>
                      ))
                    )}
                  </div>
                </div>

                <div className="workflow-column">
                  <h4>Attachments</h4>
                  <label className="attachment-upload">
                    Upload screenshot or document
                    <input type="file" onChange={handleUploadAttachment} />
                  </label>
                  <div className="attachment-list">
                    {attachments.length === 0 ? (
                      <p className="muted-text">No attachments yet.</p>
                    ) : (
                      attachments.map((attachment) => (
                        <article className="attachment-item" key={attachment.id}>
                          <strong>{attachment.fileName}</strong>
                          <span>{formatFileSize(attachment.fileSize)}</span>
                          <small>
                            {attachment.uploadedBy} · {formatDate(attachment.uploadedAt)}
                          </small>
                        </article>
                      ))
                    )}
                  </div>

                  <h4>Activity history</h4>
                  {isWorkflowLoading ? (
                    <p className="muted-text">Loading ticket history...</p>
                  ) : (
                    <div className="activity-list">
                      {activity.map((item) => (
                        <article className="activity-item" key={item.id}>
                          <span>{item.action}</span>
                          <p>{item.description}</p>
                          <small>
                            {item.actor} · {formatDate(item.createdAt)}
                          </small>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function DashboardAnalyticsPanel({ dashboard, notifications, onMarkNotificationRead, formatDate }) {
  const kpis = [
    ["Total tickets", dashboard.totalTickets],
    ["Open", dashboard.openTickets],
    ["Pending", dashboard.pendingTickets],
    ["Resolved/Closed", dashboard.resolvedTickets],
    ["Critical", dashboard.criticalTickets],
    ["Attachments", dashboard.attachmentCount]
  ];

  return (
    <section className="analytics-panel">
      <div className="kpi-grid">
        {kpis.map(([label, value]) => (
          <article className="kpi-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </div>

      <div className="analytics-layout">
        <div className="chart-grid">
          <ChartBlock title="Tickets by status" data={dashboard.ticketsByStatus} />
          <ChartBlock title="Tickets by category" data={dashboard.ticketsByCategory} />
          <ChartBlock title="Tickets by priority" data={dashboard.ticketsByPriority} />
          <ChartBlock
            title="Agent workload"
            data={dashboard.agentWorkload.map((item) => ({
              name: item.agent,
              value: item.assignedTickets + item.resolvedTickets
            }))}
          />
        </div>

        <aside className="notification-center">
          <div className="notification-header">
            <div>
              <span className="eyebrow">Notification center</span>
              <h3>{dashboard.unreadNotifications} unread</h3>
            </div>
          </div>

          <div className="notification-list">
            {notifications.map((notification) => (
              <article
                className={`notification-item ${notification.isRead ? "read" : "unread"}`}
                key={notification.id}
              >
                <div>
                  <strong>{notification.title}</strong>
                  <p>{notification.message}</p>
                  <small>
                    {notification.type} · {formatDate(notification.createdAt)}
                  </small>
                </div>
                {!notification.isRead ? (
                  <button type="button" onClick={() => onMarkNotificationRead(notification.id)}>
                    Mark read
                  </button>
                ) : null}
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function ChartBlock({ title, data }) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <article className="chart-card">
      <h3>{title}</h3>
      <div className="bar-list">
        {data.length === 0 ? (
          <p className="muted-text">No data yet.</p>
        ) : (
          data.map((item) => (
            <div className="bar-row" key={item.name}>
              <span>{item.name}</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${(item.value / maxValue) * 100}%` }} />
              </div>
              <strong>{item.value}</strong>
            </div>
          ))
        )}
      </div>
    </article>
  );
}
