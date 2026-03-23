using BugTrackingSystem.Server.Models;
using BugTrackingSystem.Server.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace BugTrackingSystem.Server.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {
            
        }
        public DbSet<Bugs> Bugs { get; set; }
        //BugDTO
        public DbSet<BugDTO> BugDTOs { get; set; }

        //Model creating
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Map entityt to table if needed
            modelBuilder.Entity<BugDTO>().ToTable("BugDTOs");
        }
    }
}
