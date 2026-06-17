using Helpdesk.Api.Models;

namespace Helpdesk.Api.Services;

public class InMemoryTicketService : ITicketService
{
    private static readonly string[] ValidPriorities = ["Low", "Medium", "High", "Critical"];
    private static readonly string[] ValidStatuses = ["Open", "In Progress", "Pending", "Resolved", "Closed"];

    private static readonly Dictionary<string, string[]> AllowedStatusTransitions = new(StringComparer.OrdinalIgnoreCase)
    {
        ["Open"] = ["In Progress", "Pending", "Closed"],
        ["In Progress"] = ["Pending", "Resolved", "Closed"],
        ["Pending"] = ["In Progress", "Resolved", "Closed"],
        ["Resolved"] = ["Closed", "In Progress"],
        ["Closed"] = ["In Progress"]
    };

    private readonly List<TicketCategoryDto> _categories =
    [
        new(Guid.Parse("10000000-0000-0000-0000-000000000001"), "Hardware", "Laptop, printer, monitor, and device issues"),
        new(Guid.Parse("10000000-0000-0000-0000-000000000002"), "Software", "Application installation and software errors"),
        new(Guid.Parse("10000000-0000-0000-0000-000000000003"), "Network", "Wi-Fi, VPN, and connectivity issues"),
        new(Guid.Parse("10000000-0000-0000-0000-000000000004"), "Email", "Mailbox, Outlook, and email access issues"),
        new(Guid.Parse("10000000-0000-0000-0000-000000000005"), "Access Request", "Permissions, accounts, and system access"),
        new(Guid.Parse("10000000-0000-0000-0000-000000000006"), "Other", "General IT support requests")
    ];

    private readonly List<string> _agents =
    [
        "Adam Diab",
        "IT Support",
        "Security Team",
        "Network Team",
        "Helpdesk Admin"
    ];

    private readonly List<TicketRecord> _tickets;
    private readonly List<TicketCommentRecord> _comments;
    private readonly List<TicketActivityRecord> _activity;
    private long _nextTicketNumber = 1045;

    public InMemoryTicketService()
    {
        _tickets =
        [
            new TicketRecord
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000001"),
                TicketNumber = 1042,
                Title = "Laptop cannot connect to office Wi-Fi",
                Description = "The laptop can see the network but fails to connect after moving to the second floor.",
                CategoryId = Guid.Parse("10000000-0000-0000-0000-000000000003"),
                Priority = "High",
                Status = "In Progress",
                CreatedBy = "Issam Fawaz",
                AssignedTo = "Adam Diab",
                CreatedAt = DateTimeOffset.UtcNow.AddDays(-2),
                UpdatedAt = DateTimeOffset.UtcNow.AddHours(-3)
            },
            new TicketRecord
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000002"),
                TicketNumber = 1038,
                Title = "Email password reset request",
                Description = "Employee cannot access mailbox after password reset.",
                CategoryId = Guid.Parse("10000000-0000-0000-0000-000000000004"),
                Priority = "Medium",
                Status = "Pending",
                CreatedBy = "Issam Fawaz",
                AssignedTo = "Security Team",
                CreatedAt = DateTimeOffset.UtcNow.AddDays(-4),
                UpdatedAt = DateTimeOffset.UtcNow.AddDays(-1)
            },
            new TicketRecord
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000003"),
                TicketNumber = 1025,
                Title = "Install approved design software",
                Description = "Design software installation needed for marketing work.",
                CategoryId = Guid.Parse("10000000-0000-0000-0000-000000000002"),
                Priority = "Low",
                Status = "Closed",
                CreatedBy = "Issam Fawaz",
                AssignedTo = "IT Support",
                CreatedAt = DateTimeOffset.UtcNow.AddDays(-10),
                UpdatedAt = DateTimeOffset.UtcNow.AddDays(-6)
            }
        ];

        _comments =
        [
            new TicketCommentRecord
            {
                Id = Guid.Parse("30000000-0000-0000-0000-000000000001"),
                TicketId = Guid.Parse("20000000-0000-0000-0000-000000000001"),
                Author = "Adam Diab",
                AuthorRole = "IT Support Agent",
                Body = "I checked the wireless profile and asked the employee to retry after reconnecting to the office network.",
                IsInternalNote = false,
                CreatedAt = DateTimeOffset.UtcNow.AddHours(-4)
            },
            new TicketCommentRecord
            {
                Id = Guid.Parse("30000000-0000-0000-0000-000000000002"),
                TicketId = Guid.Parse("20000000-0000-0000-0000-000000000001"),
                Author = "Adam Diab",
                AuthorRole = "IT Support Agent",
                Body = "Internal note: if the issue returns, escalate to the network team because it may be access point related.",
                IsInternalNote = true,
                CreatedAt = DateTimeOffset.UtcNow.AddHours(-3)
            },
            new TicketCommentRecord
            {
                Id = Guid.Parse("30000000-0000-0000-0000-000000000003"),
                TicketId = Guid.Parse("20000000-0000-0000-0000-000000000002"),
                Author = "Security Team",
                AuthorRole = "IT Support Agent",
                Body = "Password reset is waiting for identity confirmation.",
                IsInternalNote = false,
                CreatedAt = DateTimeOffset.UtcNow.AddDays(-1)
            }
        ];

        _activity =
        [
            new TicketActivityRecord
            {
                Id = Guid.Parse("40000000-0000-0000-0000-000000000001"),
                TicketId = Guid.Parse("20000000-0000-0000-0000-000000000001"),
                Action = "Ticket Created",
                Description = "Ticket #1042 was created by Issam Fawaz.",
                Actor = "Issam Fawaz",
                CreatedAt = DateTimeOffset.UtcNow.AddDays(-2)
            },
            new TicketActivityRecord
            {
                Id = Guid.Parse("40000000-0000-0000-0000-000000000002"),
                TicketId = Guid.Parse("20000000-0000-0000-0000-000000000001"),
                Action = "Assignment Changed",
                Description = "Ticket assigned to Adam Diab.",
                Actor = "Helpdesk Admin",
                CreatedAt = DateTimeOffset.UtcNow.AddDays(-2).AddHours(2)
            },
            new TicketActivityRecord
            {
                Id = Guid.Parse("40000000-0000-0000-0000-000000000003"),
                TicketId = Guid.Parse("20000000-0000-0000-0000-000000000001"),
                Action = "Status Changed",
                Description = "Status changed from Open to In Progress.",
                Actor = "Adam Diab",
                CreatedAt = DateTimeOffset.UtcNow.AddDays(-1)
            },
            new TicketActivityRecord
            {
                Id = Guid.Parse("40000000-0000-0000-0000-000000000004"),
                TicketId = Guid.Parse("20000000-0000-0000-0000-000000000002"),
                Action = "Status Changed",
                Description = "Status changed from Open to Pending.",
                Actor = "Security Team",
                CreatedAt = DateTimeOffset.UtcNow.AddDays(-1)
            },
            new TicketActivityRecord
            {
                Id = Guid.Parse("40000000-0000-0000-0000-000000000005"),
                TicketId = Guid.Parse("20000000-0000-0000-0000-000000000003"),
                Action = "Ticket Closed",
                Description = "Ticket closed after software installation was completed.",
                Actor = "IT Support",
                CreatedAt = DateTimeOffset.UtcNow.AddDays(-6)
            }
        ];
    }

    public IReadOnlyList<TicketDto> GetTickets()
    {
        return _tickets
            .OrderByDescending(ticket => ticket.UpdatedAt)
            .Select(ToDto)
            .ToList();
    }

    public IReadOnlyList<TicketCategoryDto> GetCategories()
    {
        return _categories;
    }

    public IReadOnlyList<string> GetAgents()
    {
        return _agents;
    }

    public TicketDto? GetTicket(Guid id)
    {
        var ticket = FindTicket(id);
        return ticket is null ? null : ToDto(ticket);
    }

    public TicketDto CreateTicket(CreateTicketRequest request, string createdBy)
    {
        ValidateCategory(request.CategoryId);
        var priority = NormalizeChoice(request.Priority, ValidPriorities, "priority");
        var now = DateTimeOffset.UtcNow;

        var ticket = new TicketRecord
        {
            Id = Guid.NewGuid(),
            TicketNumber = _nextTicketNumber++,
            Title = request.Title.Trim(),
            Description = request.Description.Trim(),
            CategoryId = request.CategoryId,
            Priority = priority,
            Status = "Open",
            CreatedBy = createdBy,
            AssignedTo = null,
            CreatedAt = now,
            UpdatedAt = now
        };

        _tickets.Add(ticket);
        AddActivity(ticket.Id, "Ticket Created", $"Ticket #{ticket.TicketNumber} was created by {createdBy}.", createdBy, now);

        return ToDto(ticket);
    }

    public TicketDto? UpdateTicket(Guid id, UpdateTicketRequest request, string actor)
    {
        ValidateCategory(request.CategoryId);
        var priority = NormalizeChoice(request.Priority, ValidPriorities, "priority");
        var status = NormalizeChoice(request.Status, ValidStatuses, "status");

        var ticket = FindTicket(id);

        if (ticket is null)
        {
            return null;
        }

        ValidateStatusTransition(ticket.Status, status);

        var previousStatus = ticket.Status;
        var previousAssignee = ticket.AssignedTo;
        var now = DateTimeOffset.UtcNow;

        ticket.Title = request.Title.Trim();
        ticket.Description = request.Description.Trim();
        ticket.CategoryId = request.CategoryId;
        ticket.Priority = priority;
        ticket.Status = status;
        ticket.AssignedTo = string.IsNullOrWhiteSpace(request.AssignedTo)
            ? null
            : request.AssignedTo.Trim();
        ticket.UpdatedAt = now;

        AddActivity(ticket.Id, "Ticket Updated", $"{actor} updated ticket details.", actor, now);

        if (!string.Equals(previousStatus, ticket.Status, StringComparison.OrdinalIgnoreCase))
        {
            AddActivity(ticket.Id, "Status Changed", $"Status changed from {previousStatus} to {ticket.Status}.", actor, now);
        }

        if (!string.Equals(previousAssignee, ticket.AssignedTo, StringComparison.OrdinalIgnoreCase))
        {
            var nextAssignee = ticket.AssignedTo ?? "Unassigned";
            AddActivity(ticket.Id, "Assignment Changed", $"Ticket assigned to {nextAssignee}.", actor, now);
        }

        return ToDto(ticket);
    }

    public TicketDto? AssignTicket(Guid id, AssignTicketRequest request, string actor)
    {
        var ticket = FindTicket(id);

        if (ticket is null)
        {
            return null;
        }

        if (string.IsNullOrWhiteSpace(request.AssignedTo))
        {
            throw new ArgumentException("Assigned agent is required.");
        }

        var assignee = request.AssignedTo.Trim();
        var now = DateTimeOffset.UtcNow;

        ticket.AssignedTo = assignee;
        ticket.UpdatedAt = now;

        AddActivity(ticket.Id, "Assignment Changed", $"Ticket assigned to {assignee}.", actor, now);

        if (ticket.Status == "Open")
        {
            ticket.Status = "In Progress";
            AddActivity(ticket.Id, "Status Changed", "Status changed from Open to In Progress after assignment.", actor, now);
        }

        return ToDto(ticket);
    }

    public TicketDto? UpdateTicketStatus(Guid id, UpdateTicketStatusRequest request, string actor)
    {
        var ticket = FindTicket(id);

        if (ticket is null)
        {
            return null;
        }

        var nextStatus = NormalizeChoice(request.Status, ValidStatuses, "status");
        ValidateStatusTransition(ticket.Status, nextStatus);

        if (string.Equals(ticket.Status, nextStatus, StringComparison.OrdinalIgnoreCase))
        {
            return ToDto(ticket);
        }

        var previousStatus = ticket.Status;
        var now = DateTimeOffset.UtcNow;

        ticket.Status = nextStatus;
        ticket.UpdatedAt = now;

        AddActivity(ticket.Id, "Status Changed", $"Status changed from {previousStatus} to {nextStatus}.", actor, now);

        if (nextStatus == "Resolved")
        {
            AddActivity(ticket.Id, "Resolution Updated", "Ticket was marked as resolved and is ready for closure.", actor, now);
        }

        if (nextStatus == "Closed")
        {
            AddActivity(ticket.Id, "Ticket Closed", "Ticket was closed after support work was completed.", actor, now);
        }

        return ToDto(ticket);
    }

    public IReadOnlyList<TicketCommentDto>? GetComments(Guid ticketId, bool includeInternalNotes)
    {
        if (FindTicket(ticketId) is null)
        {
            return null;
        }

        return _comments
            .Where(comment => comment.TicketId == ticketId)
            .Where(comment => includeInternalNotes || !comment.IsInternalNote)
            .OrderByDescending(comment => comment.CreatedAt)
            .Select(ToDto)
            .ToList();
    }

    public TicketCommentDto? AddComment(Guid ticketId, CreateTicketCommentRequest request, string actor, string actorRole)
    {
        var ticket = FindTicket(ticketId);

        if (ticket is null)
        {
            return null;
        }

        if (string.IsNullOrWhiteSpace(request.Body))
        {
            throw new ArgumentException("Comment body is required.");
        }

        if (request.IsInternalNote && actorRole is not ("Admin" or "IT Support Agent"))
        {
            throw new InvalidOperationException("Only support agents and admins can create internal notes.");
        }

        var now = DateTimeOffset.UtcNow;
        var comment = new TicketCommentRecord
        {
            Id = Guid.NewGuid(),
            TicketId = ticketId,
            Author = actor,
            AuthorRole = actorRole,
            Body = request.Body.Trim(),
            IsInternalNote = request.IsInternalNote,
            CreatedAt = now
        };

        _comments.Add(comment);
        ticket.UpdatedAt = now;

        var action = request.IsInternalNote ? "Internal Note Added" : "Comment Added";
        AddActivity(ticket.Id, action, $"{actor} added {(request.IsInternalNote ? "an internal note" : "a comment")}.", actor, now);

        return ToDto(comment);
    }

    public IReadOnlyList<TicketActivityDto>? GetActivity(Guid ticketId)
    {
        if (FindTicket(ticketId) is null)
        {
            return null;
        }

        return _activity
            .Where(activity => activity.TicketId == ticketId)
            .OrderByDescending(activity => activity.CreatedAt)
            .Select(ToDto)
            .ToList();
    }

    public bool DeleteTicket(Guid id)
    {
        var ticket = FindTicket(id);

        if (ticket is null)
        {
            return false;
        }

        _tickets.Remove(ticket);
        _comments.RemoveAll(comment => comment.TicketId == id);
        _activity.RemoveAll(activity => activity.TicketId == id);

        return true;
    }

    private TicketRecord? FindTicket(Guid id)
    {
        return _tickets.FirstOrDefault(item => item.Id == id);
    }

    private TicketDto ToDto(TicketRecord ticket)
    {
        var category = _categories.First(item => item.Id == ticket.CategoryId);
        var lastActivity = _activity
            .Where(activity => activity.TicketId == ticket.Id)
            .OrderByDescending(activity => activity.CreatedAt)
            .FirstOrDefault();

        return new TicketDto(
            ticket.Id,
            ticket.TicketNumber,
            ticket.Title,
            ticket.Description,
            category.Name,
            ticket.Priority,
            ticket.Status,
            ticket.CreatedBy,
            ticket.AssignedTo,
            _comments.Count(comment => comment.TicketId == ticket.Id),
            lastActivity?.Description ?? "No activity recorded yet.",
            ticket.CreatedAt,
            ticket.UpdatedAt
        );
    }

    private static TicketCommentDto ToDto(TicketCommentRecord comment)
    {
        return new TicketCommentDto(
            comment.Id,
            comment.TicketId,
            comment.Author,
            comment.AuthorRole,
            comment.Body,
            comment.IsInternalNote,
            comment.CreatedAt
        );
    }

    private static TicketActivityDto ToDto(TicketActivityRecord activity)
    {
        return new TicketActivityDto(
            activity.Id,
            activity.TicketId,
            activity.Action,
            activity.Description,
            activity.Actor,
            activity.CreatedAt
        );
    }

    private void AddActivity(Guid ticketId, string action, string description, string actor, DateTimeOffset createdAt)
    {
        _activity.Add(new TicketActivityRecord
        {
            Id = Guid.NewGuid(),
            TicketId = ticketId,
            Action = action,
            Description = description,
            Actor = actor,
            CreatedAt = createdAt
        });
    }

    private void ValidateCategory(Guid categoryId)
    {
        if (_categories.All(category => category.Id != categoryId))
        {
            throw new ArgumentException("Invalid ticket category.");
        }
    }

    private static string NormalizeChoice(string value, IReadOnlyList<string> validValues, string fieldName)
    {
        var match = validValues.FirstOrDefault(item => item.Equals(value, StringComparison.OrdinalIgnoreCase));

        if (match is null)
        {
            throw new ArgumentException($"Invalid ticket {fieldName}.");
        }

        return match;
    }

    private static void ValidateStatusTransition(string currentStatus, string nextStatus)
    {
        if (currentStatus.Equals(nextStatus, StringComparison.OrdinalIgnoreCase))
        {
            return;
        }

        if (!AllowedStatusTransitions.TryGetValue(currentStatus, out var allowedNextStatuses)
            || allowedNextStatuses.All(status => !status.Equals(nextStatus, StringComparison.OrdinalIgnoreCase)))
        {
            throw new ArgumentException($"Invalid status transition from {currentStatus} to {nextStatus}.");
        }
    }
}
