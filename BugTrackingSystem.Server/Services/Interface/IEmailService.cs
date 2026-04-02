using BugTrackingSystem.Server.Models.Email;

namespace BugTrackingSystem.Server.Services.Interface
{
    public interface IEmailService
    {
        bool SendEmailAsync(EmailRequest request);
    }
}
