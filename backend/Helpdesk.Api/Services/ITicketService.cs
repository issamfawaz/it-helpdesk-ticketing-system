using Helpdesk.Api.Models;

namespace Helpdesk.Api.Services;

public interface ITicketService
{
    IReadOnlyList<TicketDto> GetTickets();
    IReadOnlyList<TicketCategoryDto> GetCategories();
    IReadOnlyList<string> GetAgents();
    TicketDto? GetTicket(Guid id);
    TicketDto CreateTicket(CreateTicketRequest request, string createdBy);
    TicketDto? UpdateTicket(Guid id, UpdateTicketRequest request, string actor);
    TicketDto? AssignTicket(Guid id, AssignTicketRequest request, string actor);
    TicketDto? UpdateTicketStatus(Guid id, UpdateTicketStatusRequest request, string actor);
    IReadOnlyList<TicketCommentDto>? GetComments(Guid ticketId, bool includeInternalNotes);
    TicketCommentDto? AddComment(Guid ticketId, CreateTicketCommentRequest request, string actor, string actorRole);
    IReadOnlyList<TicketActivityDto>? GetActivity(Guid ticketId);
    bool DeleteTicket(Guid id);
}
