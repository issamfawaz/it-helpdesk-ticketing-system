using Helpdesk.Api.Models;

namespace Helpdesk.Api.Services;

public interface ITicketService
{
    IReadOnlyList<TicketDto> GetTickets();
    IReadOnlyList<TicketCategoryDto> GetCategories();
    TicketDto? GetTicket(Guid id);
    TicketDto CreateTicket(CreateTicketRequest request, string createdBy);
    TicketDto? UpdateTicket(Guid id, UpdateTicketRequest request);
    bool DeleteTicket(Guid id);
}

