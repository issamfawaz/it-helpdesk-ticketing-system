using Helpdesk.Api.Models;

namespace Helpdesk.Api.Services;

public class InMemoryTicketService : ITicketService
{
    private readonly List<TicketCategoryDto> _categories =
    [
        new(Guid.Parse("10000000-0000-0000-0000-000000000001"), "Hardware", "Laptop, printer, monitor, and device issues"),
        new(Guid.Parse("10000000-0000-0000-0000-000000000002"), "Software", "Application installation and software errors"),
        new(Guid.Parse("10000000-0000-0000-0000-000000000003"), "Network", "Wi-Fi, VPN, and connectivity issues"),
        new(Guid.Parse("10000000-0000-0000-0000-000000000004"), "Email", "Mailbox, Outlook, and email access issues"),
        new(Guid.Parse("10000000-0000-0000-0000-000000000005"), "Access Request", "Permissions, accounts, and system access"),
        new(Guid.Parse("10000000-0000-0000-0000-000000000006"), "Other", "General IT support requests")
    ];

    private readonly List<TicketRecord> _tickets;
    private long _nextTicketNumber = 1045;

    public InMemoryTicketService()
    {
        _tickets =
        [
            new TicketRecord
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000001"),
                TicketNumber = 1042,
                Title = "Laptop cannot connect to office Wi-Fi",
                Description = "The laptop can see the network but fails to connect after moving to the second floor.",
                CategoryId = Guid.Parse("10000000-0000-0000-0000-000000000003"),
                Priority = "High",
                Status = "In Progress",
                CreatedBy = "Issam Fawaz",
                AssignedTo = "Adam Diab",
                CreatedAt = DateTimeOffset.UtcNow.AddDays(-2),
                UpdatedAt = DateTimeOffset.UtcNow.AddHours(-3)
            },
            new TicketRecord
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000002"),
                TicketNumber = 1038,
                Title = "Email password reset request",
                Description = "Employee cannot access mailbox after password reset.",
                CategoryId = Guid.Parse("10000000-0000-0000-0000-000000000004"),
                Priority = "Medium",
                Status = "Pending",
                CreatedBy = "Issam Fawaz",
                AssignedTo = "Security Team",
                CreatedAt = DateTimeOffset.UtcNow.AddDays(-4),
                UpdatedAt = DateTimeOffset.UtcNow.AddDays(-1)
            },
            new TicketRecord
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000003"),
                TicketNumber = 1025,
                Title = "Install approved design software",
                Description = "Design software installation needed for marketing work.",
                CategoryId = Guid.Parse("10000000-0000-0000-0000-000000000002"),
                Priority = "Low",
                Status = "Closed",
                CreatedBy = "Issam Fawaz",
                AssignedTo = "IT Support",
                CreatedAt = DateTimeOffset.UtcNow.AddDays(-10),
                UpdatedAt = DateTimeOffset.UtcNow.AddDays(-6)
            }
        ];
    }

    public IReadOnlyList<TicketDto> GetTickets()
    {
        return _tickets
            .OrderByDescending(ticket => ticket.UpdatedAt)
            .Select(ToDto)
            .ToList();
    }

    public IReadOnlyList<TicketCategoryDto> GetCategories()
    {
        return _categories;
    }

    public TicketDto? GetTicket(Guid id)
    {
        var ticket = _tickets.FirstOrDefault(item => item.Id == id);
        return ticket is null ? null : ToDto(ticket);
    }

    public TicketDto CreateTicket(CreateTicketRequest request, string createdBy)
    {
        ValidateCategory(request.CategoryId);

        var ticket = new TicketRecord
        {
            Id = Guid.NewGuid(),
            TicketNumber = _nextTicketNumber++,
            Title = request.Title.Trim(),
            Description = request.Description.Trim(),
            CategoryId = request.CategoryId,
            Priority = request.Priority,
            Status = "Open",
            CreatedBy = createdBy,
            AssignedTo = null,
            CreatedAt = DateTimeOffset.UtcNow,
            UpdatedAt = DateTimeOffset.UtcNow
        };

        _tickets.Add(ticket);
        return ToDto(ticket);
    }

    public TicketDto? UpdateTicket(Guid id, UpdateTicketRequest request)
    {
        ValidateCategory(request.CategoryId);

        var ticket = _tickets.FirstOrDefault(item => item.Id == id);

        if (ticket is null)
        {
            return null;
        }

        ticket.Title = request.Title.Trim();
        ticket.Description = request.Description.Trim();
        ticket.CategoryId = request.CategoryId;
        ticket.Priority = request.Priority;
        ticket.Status = request.Status;
        ticket.AssignedTo = string.IsNullOrWhiteSpace(request.AssignedTo)
            ? null
            : request.AssignedTo.Trim();
        ticket.UpdatedAt = DateTimeOffset.UtcNow;

        return ToDto(ticket);
    }

    public bool DeleteTicket(Guid id)
    {
        var ticket = _tickets.FirstOrDefault(item => item.Id == id);

        if (ticket is null)
        {
            return false;
        }

        _tickets.Remove(ticket);
        return true;
    }

    private TicketDto ToDto(TicketRecord ticket)
    {
        var category = _categories.First(item => item.Id == ticket.CategoryId);

        return new TicketDto(
            ticket.Id,
            ticket.TicketNumber,
            ticket.Title,
            ticket.Description,
            category.Name,
            ticket.Priority,
            ticket.Status,
            ticket.CreatedBy,
            ticket.AssignedTo,
            ticket.CreatedAt,
            ticket.UpdatedAt
        );
    }

    private void ValidateCategory(Guid categoryId)
    {
        if (_categories.All(category => category.Id != categoryId))
        {
            throw new ArgumentException("Invalid ticket category.");
        }
    }
}

