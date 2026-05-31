using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Helpdesk.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TicketsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetTickets()
    {
        return Ok(new[]
        {
            new
            {
                Id = "TCK-1042",
                Title = "Laptop cannot connect to office Wi-Fi",
                Status = "In Progress",
                Priority = "High",
                AssignedTo = "Adam Diab"
            },
            new
            {
                Id = "TCK-1038",
                Title = "Email password reset request",
                Status = "Pending",
                Priority = "Medium",
                AssignedTo = "Security Team"
            }
        });
    }

    [HttpGet("agent")]
    [Authorize(Policy = "AgentOrAdmin")]
    public IActionResult GetAgentQueue()
    {
        return Ok(new { Message = "Only IT Support Agents and Admins can view this queue." });
    }

    [HttpGet("reports")]
    [Authorize(Policy = "ManagerOrAdmin")]
    public IActionResult GetReports()
    {
        return Ok(new { OpenTickets = 38, PendingTickets = 11, ResolvedThisMonth = 64 });
    }
}

