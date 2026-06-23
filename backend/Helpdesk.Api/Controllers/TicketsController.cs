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

    [HttpGet("agents")]
    [Authorize(Policy = "AgentOrAdmin")]
    public ActionResult<IReadOnlyList<string>> GetAgents()
    {
        return Ok(_ticketService.GetAgents());
    }

    [HttpGet("dashboard")]
    public ActionResult<DashboardAnalyticsDto> GetDashboard()
    {
        return Ok(_ticketService.GetDashboardAnalytics());
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

        try
        {
            var ticket = _ticketService.CreateTicket(request, GetActorName());
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
            var ticket = _ticketService.UpdateTicket(id, request, GetActorName());

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

    [HttpPatch("{id:guid}/assignment")]
    [Authorize(Policy = "AgentOrAdmin")]
    public ActionResult<TicketDto> AssignTicket(Guid id, AssignTicketRequest request)
    {
        try
        {
            var ticket = _ticketService.AssignTicket(id, request, GetActorName());

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

    [HttpPatch("{id:guid}/status")]
    [Authorize(Policy = "AgentOrAdmin")]
    public ActionResult<TicketDto> UpdateTicketStatus(Guid id, UpdateTicketStatusRequest request)
    {
        try
        {
            var ticket = _ticketService.UpdateTicketStatus(id, request, GetActorName());

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

    [HttpGet("{id:guid}/comments")]
    public ActionResult<IReadOnlyList<TicketCommentDto>> GetComments(Guid id)
    {
        var comments = _ticketService.GetComments(id, CanViewInternalNotes());

        if (comments is null)
        {
            return NotFound(new { Message = "Ticket was not found." });
        }

        return Ok(comments);
    }

    [HttpPost("{id:guid}/comments")]
    public ActionResult<TicketCommentDto> AddComment(Guid id, CreateTicketCommentRequest request)
    {
        if (request.IsInternalNote && !CanViewInternalNotes())
        {
            return Forbid();
        }

        try
        {
            var comment = _ticketService.AddComment(id, request, GetActorName(), GetActorRole());

            if (comment is null)
            {
                return NotFound(new { Message = "Ticket was not found." });
            }

            return CreatedAtAction(nameof(GetComments), new { id }, comment);
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new { exception.Message });
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(new { exception.Message });
        }
    }

    [HttpGet("{id:guid}/activity")]
    public ActionResult<IReadOnlyList<TicketActivityDto>> GetActivity(Guid id)
    {
        var activity = _ticketService.GetActivity(id);

        if (activity is null)
        {
            return NotFound(new { Message = "Ticket was not found." });
        }

        return Ok(activity);
    }

    [HttpGet("{id:guid}/attachments")]
    public ActionResult<IReadOnlyList<TicketAttachmentDto>> GetAttachments(Guid id)
    {
        var attachments = _ticketService.GetAttachments(id);

        if (attachments is null)
        {
            return NotFound(new { Message = "Ticket was not found." });
        }

        return Ok(attachments);
    }

    [HttpPost("{id:guid}/attachments")]
    [RequestSizeLimit(5_000_000)]
    public ActionResult<TicketAttachmentDto> UploadAttachment(Guid id, [FromForm] IFormFile file)
    {
        if (file is null)
        {
            return BadRequest(new { Message = "Attachment file is required." });
        }

        try
        {
            var attachment = _ticketService.AddAttachment(
                id,
                file.FileName,
                file.Length,
                file.ContentType,
                GetActorName());

            if (attachment is null)
            {
                return NotFound(new { Message = "Ticket was not found." });
            }

            return CreatedAtAction(nameof(GetAttachments), new { id }, attachment);
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

    private string GetActorName()
    {
        return User.Identity?.Name
            ?? User.FindFirstValue(ClaimTypes.Email)
            ?? "Authenticated User";
    }

    private string GetActorRole()
    {
        return User.FindFirstValue(ClaimTypes.Role) ?? "Employee";
    }

    private bool CanViewInternalNotes()
    {
        var role = GetActorRole();
        return role is "Admin" or "IT Support Agent";
    }
}
