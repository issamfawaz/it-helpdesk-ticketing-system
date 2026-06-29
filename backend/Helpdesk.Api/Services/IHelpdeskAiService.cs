using Helpdesk.Api.Models;

namespace Helpdesk.Api.Services;

public interface IHelpdeskAiService
{
    AiTicketAnalysisDto AnalyzeTicket(AiTicketAnalysisRequest request);
    AiChatResponse AskAssistant(AiChatRequest request);
}
