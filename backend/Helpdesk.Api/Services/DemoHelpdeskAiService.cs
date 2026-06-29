using Helpdesk.Api.Models;

namespace Helpdesk.Api.Services;

public class DemoHelpdeskAiService : IHelpdeskAiService
{
    public AiTicketAnalysisDto AnalyzeTicket(AiTicketAnalysisRequest request)
    {
        var text = $"{request.Title} {request.Description}".ToLowerInvariant();
        var category = DetectCategory(text);
        var priority = DetectPriority(text);

        return new AiTicketAnalysisDto(
            category,
            priority,
            BuildSummary(request.Title, category, priority),
            BuildSuggestions(category, priority),
            $"Detected {category} keywords and recommended {priority} priority based on business impact.",
            priority == "Critical" ? 0.93 : 0.86
        );
    }

    public AiChatResponse AskAssistant(AiChatRequest request)
    {
        var message = request.Message.ToLowerInvariant();
        var category = string.IsNullOrWhiteSpace(request.Category)
            ? DetectCategory($"{request.TicketTitle} {request.TicketDescription} {request.Message}".ToLowerInvariant())
            : request.Category;

        if (message.Contains("vpn") || message.Contains("wifi") || message.Contains("network"))
        {
            return new AiChatResponse(
                "Check connectivity, confirm the user is on the correct network, restart the adapter, and escalate to the network team if multiple users are affected.",
                BuildSuggestions("Network", "High")
            );
        }

        if (message.Contains("password") || message.Contains("login") || message.Contains("access"))
        {
            return new AiChatResponse(
                "Verify the user's identity, check account lock status, confirm role permissions, and reset credentials only after approval.",
                BuildSuggestions("Access Request", "Medium")
            );
        }

        if (message.Contains("summary") || message.Contains("summarize"))
        {
            return new AiChatResponse(
                BuildSummary(request.TicketTitle ?? "Selected ticket", category, "Medium"),
                BuildSuggestions(category, "Medium")
            );
        }

        return new AiChatResponse(
            $"This looks related to {category}. Start with basic validation, gather screenshots or logs, update the ticket status, and document the result in the activity history.",
            BuildSuggestions(category, "Medium")
        );
    }

    private static string DetectCategory(string text)
    {
        if (ContainsAny(text, "wifi", "wi-fi", "vpn", "internet", "network", "connection", "router"))
        {
            return "Network";
        }

        if (ContainsAny(text, "email", "outlook", "mailbox", "smtp", "inbox"))
        {
            return "Email";
        }

        if (ContainsAny(text, "password", "permission", "login", "access", "account", "role"))
        {
            return "Access Request";
        }

        if (ContainsAny(text, "laptop", "printer", "monitor", "mouse", "keyboard", "hardware", "device"))
        {
            return "Hardware";
        }

        if (ContainsAny(text, "software", "install", "application", "app", "crash", "error"))
        {
            return "Software";
        }

        return "Other";
    }

    private static string DetectPriority(string text)
    {
        if (ContainsAny(text, "server down", "outage", "all users", "production", "offline", "security breach", "critical"))
        {
            return "Critical";
        }

        if (ContainsAny(text, "urgent", "cannot work", "blocked", "high priority", "manager", "no access"))
        {
            return "High";
        }

        if (ContainsAny(text, "install", "request", "question", "minor", "low"))
        {
            return "Low";
        }

        return "Medium";
    }

    private static string BuildSummary(string title, string category, string priority)
    {
        var cleanTitle = string.IsNullOrWhiteSpace(title) ? "This ticket" : title.Trim();
        return $"{cleanTitle} appears to be a {category} support request with {priority} priority. The support team should confirm impact, collect evidence, and update the ticket workflow.";
    }

    private static IReadOnlyList<string> BuildSuggestions(string category, string priority)
    {
        var shared = priority == "Critical"
            ? "Notify the responsible support lead and document every action in the activity log."
            : "Update the ticket status after each support action.";

        return category switch
        {
            "Network" =>
            [
                "Confirm whether the issue affects one user or multiple users.",
                "Check VPN, Wi-Fi, and adapter status before escalation.",
                shared
            ],
            "Email" =>
            [
                "Confirm mailbox access, Outlook profile status, and recent password changes.",
                "Check whether webmail works before reinstalling the mail client.",
                shared
            ],
            "Access Request" =>
            [
                "Verify user identity and approval before changing permissions.",
                "Check role assignment and account lock status.",
                shared
            ],
            "Hardware" =>
            [
                "Ask for a screenshot or photo of the device problem.",
                "Check cable, power, driver, and replacement availability.",
                shared
            ],
            "Software" =>
            [
                "Collect the exact error message and app version.",
                "Check whether the issue happens after restart or reinstall.",
                shared
            ],
            _ =>
            [
                "Ask the employee for exact steps to reproduce the issue.",
                "Collect screenshots, logs, and affected device details.",
                shared
            ]
        };
    }

    private static bool ContainsAny(string text, params string[] keywords)
    {
        return keywords.Any(text.Contains);
    }
}
