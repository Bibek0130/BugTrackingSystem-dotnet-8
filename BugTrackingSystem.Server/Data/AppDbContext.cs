using BugTrackingSystem.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BugTrackingSystem.Server.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {
            
        }
        public DbSet<Bugs> Bugs { get; set; }
    }
}
