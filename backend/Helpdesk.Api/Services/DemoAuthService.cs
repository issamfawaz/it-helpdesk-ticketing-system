using Helpdesk.Api.Models;

namespace Helpdesk.Api.Services;

public class DemoAuthService : IAuthService
{
    private static readonly List<(string Password, AppUser User)> DemoUsers =
    [
        ("Admin123!", new AppUser
        {
            Id = Guid.Parse("00000000-0000-0000-0000-000000000101"),
            FullName = "Helpdesk Admin",
            Email = "admin@company.com",
            RoleName = "Admin",
            PasswordHash = "demo"
        }),
        ("Agent123!", new AppUser
        {
            Id = Guid.Parse("00000000-0000-0000-0000-000000000102"),
            FullName = "Adam Diab",
            Email = "adam.diab@company.com",
            RoleName = "IT Support Agent",
            PasswordHash = "demo"
        }),
        ("Employee123!", new AppUser
        {
            Id = Guid.Parse("00000000-0000-0000-0000-000000000103"),
            FullName = "Issam Fawaz",
            Email = "issam.fawaz@company.com",
            RoleName = "Employee",
            PasswordHash = "demo"
        }),
        ("Manager123!", new AppUser
        {
            Id = Guid.Parse("00000000-0000-0000-0000-000000000104"),
            FullName = "Support Manager",
            Email = "manager@company.com",
            RoleName = "Manager",
            PasswordHash = "demo"
        })
    ];

    public AppUser? ValidateUser(string email, string password)
    {
        return DemoUsers
            .FirstOrDefault(item =>
                item.User.Email.Equals(email, StringComparison.OrdinalIgnoreCase)
                && item.Password == password)
            .User;
    }
}

