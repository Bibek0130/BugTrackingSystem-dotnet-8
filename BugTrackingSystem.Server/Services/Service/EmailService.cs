using MailKit;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using BugTrackingSystem.Server.Services.Interface;
using BugTrackingSystem.Server.Models;
using BugTrackingSystem.Server.Models.Email;
using MimeKit;

namespace BugTrackingSystem.Server.Services.Service
{
    public class EmailService: IEmailService
    {
        SmtpSettings Smtp_Settings = null;
        public EmailService(IOptions<SmtpSettings> options)
        {
            Smtp_Settings = options.Value;
        }

        //method
        public bool SendEmailAsync(EmailRequest request)
        {
            try
            {
                //Mime Message - a class from MimeKit library
                MimeMessage email_Message = new MimeMessage();
                MailboxAddress email_from = new MailboxAddress(Smtp_Settings.Name, Smtp_Settings.EmailId);
                email_Message.From.Add(email_from);
                MailboxAddress email_To = new MailboxAddress(request.EmailToName,request.EmailToId);
                email_Message.To.Add(email_To);
                email_Message.Subject = request.EmailSubject;

                BodyBuilder emailBodyBuilder = new BodyBuilder();
                emailBodyBuilder.TextBody = request.EmailBody;
                email_Message.Body = emailBodyBuilder.ToMessageBody();

                //this is the SMtpClient class from the MailKit.Net.Smtp namespace
                SmtpClient MailClient = new SmtpClient();
                MailClient.Connect(Smtp_Settings.Host,Smtp_Settings.Port, Smtp_Settings.UseSSL);
                MailClient.Authenticate(Smtp_Settings.EmailId, Smtp_Settings.Password);
                MailClient.Send(email_Message);
                MailClient.Disconnect(true);
                MailClient.Dispose();
                return true;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
