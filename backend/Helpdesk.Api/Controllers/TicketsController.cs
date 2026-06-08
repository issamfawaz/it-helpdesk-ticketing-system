using System.Security.Claims;
using Helpdesk.Api.Models;
using Helpdesk.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Helpdesk.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TicketsController : ControllerBase
{
    private readonly ITicketService _ticketService;

    public TicketsController(ITicketService ticketService)
    {
        _ticketService = ticketService;
    }

    [HttpGet]
    public ActionResult<IReadOnlyList<TicketDto>> GetTickets()
    {
        return Ok(_ticketService.GetTickets());
    }

    [HttpGet("{id:guid}")]
    public ActionResult<TicketDto> GetTicket(Guid id)
    {
        var ticket = _ticketService.GetTicket(id);

        if (ticket is null)
        {
            return NotFound(new { Message = "Ticket was not found." });
        }

        return Ok(ticket);
    }

    [HttpPost]
    public ActionResult<TicketDto> CreateTicket(CreateTicketRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Title) || string.IsNullOrWhiteSpace(request.Description))
        {
            return BadRequest(new { Message = "Title and description are required." });
        }

        var createdBy = User.Identity?.Name
            ?? User.FindFirstValue(ClaimTypes.Email)
            ?? "Authenticated User";

        try
        {
            var ticket = _ticketService.CreateTicket(request, createdBy);
            return CreatedAtAction(nameof(GetTicket), new { id = ticket.Id }, ticket);
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { exception.Message });
        }
    }

    [HttpPut("{id:guid}")]
    [Authorize(Policy = "AgentOrAdmin")]
    public ActionResult<TicketDto> UpdateTicket(Guid id, UpdateTicketRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Title) || string.IsNullOrWhiteSpace(request.Description))
        {
            return BadRequest(new { Message = "Title and description are required." });
        }

        try
        {
            var ticket = _ticketService.UpdateTicket(id, request);

            if (ticket is null)
            {
                return NotFound(new { Message = "Ticket was not found." });
            }

            return Ok(ticket);
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { exception.Message });
        }
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Policy = "AgentOrAdmin")]
    public IActionResult DeleteTicket(Guid id)
    {
        var deleted = _ticketService.DeleteTicket(id);

        if (!deleted)
        {
            return NotFound(new { Message = "Ticket was not found." });
        }

        return NoContent();
    }

    [HttpGet("agent")]
    [Authorize(Policy = "AgentOrAdmin")]
    public IActionResult GetAgentQueue()
    {
        return Ok(_ticketService.GetTickets().Where(ticket => ticket.Status != "Closed"));
    }

    [HttpGet("reports")]
    [Authorize(Policy = "ManagerOrAdmin")]
    public IActionResult GetReports()
    {
        var tickets = _ticketService.GetTickets();

        return Ok(new
        {
            OpenTickets = tickets.Count(ticket => ticket.Status == "Open"),
            PendingTickets = tickets.Count(ticket => ticket.Status == "Pending"),
            ResolvedOrClosedTickets = tickets.Count(ticket => ticket.Status is "Resolved" or "Closed")
        });
    }
}

