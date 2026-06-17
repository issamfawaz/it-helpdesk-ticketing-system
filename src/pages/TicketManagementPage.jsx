import { useEffect, useMemo, useState } from "react";
import {
  addTicketComment,
  assignTicket,
  createTicket,
  deleteTicket,
  getAgents,
  getCategories,
  getTicketActivity,
  getTicketComments,
  getTickets,
  updateTicket,
  updateTicketStatus
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

export default function TicketManagementPage({ session }) {
  const [tickets, setTickets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [commentForm, setCommentForm] = useState(emptyCommentForm);
  const [comments, setComments] = useState([]);
  const [activity, setActivity] = useState([]);
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
      const [nextCategories, nextTickets, nextAgents] = await Promise.all([
        getCategories(session),
        getTickets(session),
        getAgents(session)
      ]);

      setCategories(nextCategories);
      setTickets(nextTickets);
      setAgents(nextAgents);
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

  async function loadWorkflowForTicket(ticketId) {
    setIsWorkflowLoading(true);
    const [nextComments, nextActivity] = await Promise.all([
      getTicketComments(session, ticketId),
      getTicketActivity(session, ticketId)
    ]);

    setComments(nextComments);
    setActivity(nextActivity);
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
      return;
    }

    const created = await createTicket(session, form);
    setTickets((currentTickets) => [created, ...currentTickets]);
    setSelectedTicketId(created.id);
    setMessage("Ticket created successfully.");
    resetForm();
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
  }

  async function handleAssign(assignedTo) {
    if (!selectedTicket || !assignedTo) {
      return;
    }

    const updated = await assignTicket(session, selectedTicket.id, { assignedTo });
    mergeTicket(updated);
    setWorkflowMessage(`Ticket assigned to ${assignedTo}.`);
    await loadWorkflowForTicket(selectedTicket.id);
  }

  async function handleStatusChange(status) {
    if (!selectedTicket) {
      return;
    }

    const updated = await updateTicketStatus(session, selectedTicket.id, { status });
    mergeTicket(updated);
    setWorkflowMessage(`Status updated to ${status}.`);
    await loadWorkflowForTicket(selectedTicket.id);
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
  }

  function formatDate(value) {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(value));
  }

  if (isLoading) {
    return <section className="content-panel">Loading tickets...</section>;
  }

  return (
    <section className="ticket-workspace">
      <div className="ticket-header">
        <div>
          <span className="eyebrow">Ticket assignment workflow</span>
          <h2>Ticket Management</h2>
          <p>
            Assign tickets to agents, update workflow statuses, add replies, record internal notes,
            and review the ticket history from one workspace.
          </p>
        </div>
        <div className="ticket-summary">
          <span>Open: {summary.open}</span>
          <span>In Progress: {summary.inProgress}</span>
          <span>Pending: {summary.pending}</span>
          <span>Closed: {summary.closed}</span>
        </div>
      </div>

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
                  <th>Comments</th>
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
                    <td>{ticket.commentCount ?? 0}</td>
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
