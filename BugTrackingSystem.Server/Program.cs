using BugTrackingSystem.Server.Data;
using BugTrackingSystem.Server.Models;
using BugTrackingSystem.Server.Services.Interface;
using BugTrackingSystem.Server.Services.Service;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;

var builder = WebApplication.CreateBuilder(args);

//Load smtp configurations
// Load SMTP settings from configuration
builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection("SmtpSettings"));

//applying CORS policy for server origin: 7088
builder.Services.AddCors(options =>
{
    options.AddPolicy("devCORS",
        policy =>
        {
            policy.WithOrigins("https://localhost:64240").AllowAnyHeader().AllowAnyMethod();
        });
});

// Add services to the container.

builder.Services.AddControllers();

//DbContext Injection
builder.Services.AddDbContext<AppDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



//registreing services as DI so that controllers can use them
builder.Services.AddTransient<IEmailService, EmailService>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("devCORS");

app.UseAuthorization();

app.MapControllers();

//app.MapFallbackToFile("/index.html"); //in dev
app.MapFallbackToFile("index.html"); //in production    

//render config for  port in production
var port = Environment.GetEnvironmentVariable("PORT") ?? "5182"; //if port is not set, use 5182 as default
app.Urls.Add($"http://*:{port}");

app.Run();
