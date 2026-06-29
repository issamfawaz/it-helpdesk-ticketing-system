using Helpdesk.Api.Models;
using Helpdesk.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Helpdesk.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AiController : ControllerBase
{
    private readonly IHelpdeskAiService _aiService;

    public AiController(IHelpdeskAiService aiService)
    {
        _aiService = aiService;
    }

    [HttpPost("analyze-ticket")]
    public ActionResult<AiTicketAnalysisDto> AnalyzeTicket(AiTicketAnalysisRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Title) && string.IsNullOrWhiteSpace(request.Description))
        {
            return BadRequest(new { Message = "Ticket title or description is required." });
        }

        return Ok(_aiService.AnalyzeTicket(request));
    }

    [HttpPost("chat")]
    public ActionResult<AiChatResponse> Chat(AiChatRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Message))
        {
            return BadRequest(new { Message = "Assistant message is required." });
        }

        return Ok(_aiService.AskAssistant(request));
    }
}
