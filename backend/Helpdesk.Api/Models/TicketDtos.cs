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

