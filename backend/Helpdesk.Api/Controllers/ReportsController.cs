using System.Net;
using System.Text;
using Helpdesk.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Helpdesk.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ReportsController : ControllerBase
{
    private readonly ITicketService _ticketService;

    public ReportsController(ITicketService ticketService)
    {
        _ticketService = ticketService;
    }

    [HttpGet("summary")]
    public IActionResult GetSummary()
    {
        return Ok(_ticketService.GetDashboardAnalytics());
    }

    [HttpGet("export/excel")]
    public IActionResult ExportExcel()
    {
        var rows = new StringBuilder();
        rows.AppendLine("TicketNumber,Title,Category,Priority,Status,AssignedTo,CreatedBy,UpdatedAt");

        foreach (var ticket in _ticketService.GetTickets())
        {
            rows.AppendLine(string.Join(",",
                ticket.TicketNumber,
                EscapeCsv(ticket.Title),
                EscapeCsv(ticket.Category),
                EscapeCsv(ticket.Priority),
                EscapeCsv(ticket.Status),
                EscapeCsv(ticket.AssignedTo ?? "Unassigned"),
                EscapeCsv(ticket.CreatedBy),
                ticket.UpdatedAt.ToString("u")));
        }

        return File(
            Encoding.UTF8.GetBytes(rows.ToString()),
            "text/csv",
            $"helpdesk-report-{DateTime.UtcNow:yyyyMMdd}.csv");
    }

    [HttpGet("export/pdf")]
    public IActionResult ExportPdf()
    {
        var tickets = _ticketService.GetTickets();
        var dashboard = _ticketService.GetDashboardAnalytics();
        var html = new StringBuilder();

        html.AppendLine("<!doctype html><html><head><meta charset=\"utf-8\"><title>Helpdesk Report</title>");
        html.AppendLine("<style>body{font-family:Arial,sans-serif;color:#172033;margin:32px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #d9e0ea;padding:8px;text-align:left;font-size:13px}th{background:#f5f7fb}.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:18px 0}.kpi{border:1px solid #d9e0ea;padding:12px;border-radius:8px}.kpi span{display:block;color:#637083;font-size:12px}.kpi strong{font-size:26px}</style>");
        html.AppendLine("</head><body>");
        html.AppendLine("<h1>IT Helpdesk Ticket Report</h1>");
        html.AppendLine($"<p>Generated on {DateTime.UtcNow:u}</p>");
        html.AppendLine("<section class=\"kpis\">");
        html.AppendLine(BuildKpi("Total Tickets", dashboard.TotalTickets));
        html.AppendLine(BuildKpi("Open", dashboard.OpenTickets));
        html.AppendLine(BuildKpi("Pending", dashboard.PendingTickets));
        html.AppendLine(BuildKpi("Resolved/Closed", dashboard.ResolvedTickets));
        html.AppendLine("</section>");
        html.AppendLine("<table><thead><tr><th>#</th><th>Title</th><th>Category</th><th>Priority</th><th>Status</th><th>Assigned</th></tr></thead><tbody>");

        foreach (var ticket in tickets)
        {
            html.AppendLine("<tr>");
            html.AppendLine($"<td>{ticket.TicketNumber}</td>");
            html.AppendLine($"<td>{WebUtility.HtmlEncode(ticket.Title)}</td>");
            html.AppendLine($"<td>{WebUtility.HtmlEncode(ticket.Category)}</td>");
            html.AppendLine($"<td>{WebUtility.HtmlEncode(ticket.Priority)}</td>");
            html.AppendLine($"<td>{WebUtility.HtmlEncode(ticket.Status)}</td>");
            html.AppendLine($"<td>{WebUtility.HtmlEncode(ticket.AssignedTo ?? "Unassigned")}</td>");
            html.AppendLine("</tr>");
        }

        html.AppendLine("</tbody></table>");
        html.AppendLine("<script>window.addEventListener('load',()=>window.print())</script>");
        html.AppendLine("</body></html>");

        return File(
            Encoding.UTF8.GetBytes(html.ToString()),
            "text/html",
            $"helpdesk-report-{DateTime.UtcNow:yyyyMMdd}.html");
    }

    private static string EscapeCsv(string value)
    {
        return $"\"{value.Replace("\"", "\"\"")}\"";
    }

    private static string BuildKpi(string label, int value)
    {
        return $"<article class=\"kpi\"><span>{WebUtility.HtmlEncode(label)}</span><strong>{value}</strong></article>";
    }
}
