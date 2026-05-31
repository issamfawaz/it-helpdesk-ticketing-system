using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Helpdesk.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Policy = "AdminOnly")]
public class AdminController : ControllerBase
{
    [HttpGet("roles")]
    public IActionResult GetRoles()
    {
        return Ok(new[] { "Admin", "IT Support Agent", "Employee", "Manager" });
    }
}

