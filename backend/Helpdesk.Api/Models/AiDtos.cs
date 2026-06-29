namespace Helpdesk.Api.Models;

public record AiTicketAnalysisRequest(
    string Title,
    string Description
);

public record AiTicketAnalysisDto(
    string SuggestedCategory,
    string SuggestedPriority,
    string Summary,
    IReadOnlyList<string> TroubleshootingSuggestions,
    string Explanation,
    double Confidence
);

public record AiChatRequest(
    string Message,
    string? TicketTitle,
    string? TicketDescription,
    string? Category
);

public record AiChatResponse(
    string Reply,
    IReadOnlyList<string> SuggestedActions
);
