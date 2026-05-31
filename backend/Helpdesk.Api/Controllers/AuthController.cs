using System.Security.Claims;
using Helpdesk.Api.Models;
using Helpdesk.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Helpdesk.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IJwtTokenService _jwtTokenService;

    public AuthController(IAuthService authService, IJwtTokenService jwtTokenService)
    {
        _authService = authService;
        _jwtTokenService = jwtTokenService;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public ActionResult<LoginResponse> Login(LoginRequest request)
    {
        var user = _authService.ValidateUser(request.Email, request.Password);

        if (user is null)
        {
            return Unauthorized(new { Message = "Invalid email or password." });
        }

        return Ok(_jwtTokenService.CreateToken(user));
    }

    [HttpGet("me")]
    [Authorize]
    public ActionResult<CurrentUserResponse> Me()
    {
        var fullName = User.Identity?.Name ?? "Unknown user";
        var email = User.FindFirstValue(ClaimTypes.Email)
            ?? User.FindFirstValue("email")
            ?? "unknown@company.com";
        var role = User.FindFirstValue(ClaimTypes.Role) ?? "Employee";

        return Ok(new CurrentUserResponse(fullName, email, role));
    }
}

