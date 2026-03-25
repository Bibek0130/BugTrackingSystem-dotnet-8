using System.ComponentModel.DataAnnotations.Schema;

namespace BugTrackingSystem.Server.Models.DTO
{
    public class BugDTO
    {
        [Column("Id")]
        public int? Id { get; set; }
        [Column("Title")]
        public string? Title { get; set; }
        [Column("Description")]
        public string? Description { get; set; } = null;
        [Column("Status")]
        public string? Status { get; set; }
        [Column("Severity")]
        public string? Severity { get; set; }
        [Column("CreatedDate")]
        public DateTime? CreatedDate { get; set; }
    }
}
