using BugTrackingSystem.Server.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BugTrackingSystem.Server.Models.Email;

namespace BugTrackingSystem.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        IEmailService Email_Service {  get; set; }

        public EmailController(IEmailService emailService)
        {
            Email_Service = emailService;
        }

        [HttpPost("SendMail")]
        public bool SendEmail(EmailRequest request)
        {
            return Email_Service.SendEmailAsync(request);
        }
    }
}
