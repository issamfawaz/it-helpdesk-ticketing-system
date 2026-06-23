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
    int AttachmentCount,
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

public record TicketAttachmentDto(
    Guid Id,
    Guid TicketId,
    string FileName,
    long FileSize,
    string ContentType,
    string UploadedBy,
    DateTimeOffset UploadedAt
);

public record NotificationDto(
    Guid Id,
    Guid? TicketId,
    string Title,
    string Message,
    string Type,
    bool IsRead,
    DateTimeOffset CreatedAt
);

public record DashboardSliceDto(
    string Name,
    int Value
);

public record AgentWorkloadDto(
    string Agent,
    int AssignedTickets,
    int ResolvedTickets
);

public record DashboardAnalyticsDto(
    int TotalTickets,
    int OpenTickets,
    int PendingTickets,
    int ResolvedTickets,
    int CriticalTickets,
    int AttachmentCount,
    int UnreadNotifications,
    IReadOnlyList<DashboardSliceDto> TicketsByStatus,
    IReadOnlyList<DashboardSliceDto> TicketsByCategory,
    IReadOnlyList<DashboardSliceDto> TicketsByPriority,
    IReadOnlyList<AgentWorkloadDto> AgentWorkload
);
