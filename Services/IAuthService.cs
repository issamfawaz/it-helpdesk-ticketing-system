using Helpdesk.Api.Models;

namespace Helpdesk.Api.Services;

public interface IAuthService
{
    AppUser? ValidateUser(string email, string password);
}

