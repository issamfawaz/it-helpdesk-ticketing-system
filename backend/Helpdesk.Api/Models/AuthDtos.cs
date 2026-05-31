namespace Helpdesk.Api.Models;

public record LoginRequest(string Email, string Password);

public record LoginResponse(
    string Token,
    string FullName,
    string Email,
    string Role,
    DateTimeOffset ExpiresAt
);

public record CurrentUserResponse(
    string FullName,
    string Email,
    string Role
);

