namespace Helpdesk.Api.Models;

public record TicketCategoryDto(
    Guid Id,
    string Name,
    string Description
);

public record TicketDto(
    Guid Id,
    long TicketNumber,
    string Title,
    string Description,
    string Category,
    string Priority,
    string Status,
    string CreatedBy,
    string? AssignedTo,
    int CommentCount,
    string LastActivity,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt
);

public record CreateTicketRequest(
    string Title,
    string Description,
    Guid CategoryId,
    string Priority
);

public record UpdateTicketRequest(
    string Title,
    string Description,
    Guid CategoryId,
    string Priority,
    string Status,
    string? AssignedTo
);

public record AssignTicketRequest(
    string AssignedTo
);

public record UpdateTicketStatusRequest(
    string Status
);

public record CreateTicketCommentRequest(
    string Body,
    bool IsInternalNote
);

public record TicketCommentDto(
    Guid Id,
    Guid TicketId,
    string Author,
    string AuthorRole,
    string Body,
    bool IsInternalNote,
    DateTimeOffset CreatedAt
);

public record TicketActivityDto(
    Guid Id,
    Guid TicketId,
    string Action,
    string Description,
    string Actor,
    DateTimeOffset CreatedAt
);
