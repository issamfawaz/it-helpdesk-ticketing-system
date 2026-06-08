using Helpdesk.Api.Models;

namespace Helpdesk.Api.Services;

public interface IJwtTokenService
{
    LoginResponse CreateToken(AppUser user);
}

