import { useEffect, useMemo, useState } from "react";
import {
  createTicket,
  deleteTicket,
  getCategories,
  getTickets,
  updateTicket
} from "../api/ticketsApi.js";

const emptyForm = {
  title: "",
  description: "",
  categoryId: "",
  priority: "Medium",
  status: "Open",
  assignedTo: ""
};

const priorities = ["Low", "Medium", "High", "Critical"];
const statuses = ["Open", "In Progress", "Pending", "Resolved", "Closed"];

export default function TicketManagementPage({ session }) {
  const [tickets, setTickets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingTicketId, setEditingTicketId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  const canManageTickets = ["Admin", "IT Support Agent"].includes(session.role);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const [nextCategories, nextTickets] = await Promise.all([
        getCategories(session),
        getTickets(session)
      ]);

      setCategories(nextCategories);
      setTickets(nextTickets);
      setForm((currentForm) => ({
        ...currentForm,
        categoryId: nextCategories[0]?.id ?? ""
      }));
      setIsLoading(false);
    }

    loadData();
  }, [session]);

  const summary = useMemo(() => {
    return {
      open: tickets.filter((ticket) => ticket.status === "Open").length,
      inProgress: tickets.filter((ticket) => ticket.status === "In Progress").length,
      closed: tickets.filter((ticket) => ticket.status === "Closed").length
    };
  }, [tickets]);

  function updateForm(field, value) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  }

  function startEdit(ticket) {
    const category = categories.find((item) => item.name === ticket.category);

    setEditingTicketId(ticket.id);
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
      setTickets((currentTickets) =>
        currentTickets.map((ticket) => (ticket.id === editingTicketId ? updated : ticket))
      );
      setMessage("Ticket updated successfully.");
      resetForm();
      return;
    }

    const created = await createTicket(session, form);
    setTickets((currentTickets) => [created, ...currentTickets]);
    setMessage("Ticket created successfully.");
    resetForm();
  }

  async function handleDelete(ticketId) {
    await deleteTicket(session, ticketId);
    setTickets((currentTickets) => currentTickets.filter((ticket) => ticket.id !== ticketId));
    setMessage("Ticket deleted successfully.");
  }

  if (isLoading) {
    return <section className="content-panel">Loading tickets...</section>;
  }

  return (
    <section className="ticket-workspace">
      <div className="ticket-header">
        <div>
          <span className="eyebrow">Ticket CRUD operations</span>
          <h2>Ticket Management</h2>
          <p>
            Create, update, delete, categorize, and track tickets through API-connected React screens.
          </p>
        </div>
        <div className="ticket-summary">
          <span>Open: {summary.open}</span>
          <span>In Progress: {summary.inProgress}</span>
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
            <>
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
            </>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
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
                    <td>
                      <div className="table-actions">
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
        </div>
      </div>
    </section>
  );
}

