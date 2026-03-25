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
        public DbSet<BugDTO> BugDTO { get; set; }

        //Model creating
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //
            base.OnModelCreating(modelBuilder);

            //Map entityt to table if needed
            //Has no key tells ef core to not worry about tracking id, just map data.
            modelBuilder.Entity<BugDTO>().HasNoKey();
                //.ToTable("BugDTOs");
        }
    }
}
