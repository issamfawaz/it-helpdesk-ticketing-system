using Helpdesk.Api.Models;
using Helpdesk.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Helpdesk.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class NotificationsController : ControllerBase
{
    private readonly ITicketService _ticketService;

    public NotificationsController(ITicketService ticketService)
    {
        _ticketService = ticketService;
    }

    [HttpGet]
    public ActionResult<IReadOnlyList<NotificationDto>> GetNotifications()
    {
        return Ok(_ticketService.GetNotifications());
    }

    [HttpPatch("{id:guid}/read")]
    public ActionResult<NotificationDto> MarkNotificationRead(Guid id)
    {
        var notification = _ticketService.MarkNotificationRead(id);

        if (notification is null)
        {
            return NotFound(new { Message = "Notification was not found." });
        }

        return Ok(notification);
    }
}
