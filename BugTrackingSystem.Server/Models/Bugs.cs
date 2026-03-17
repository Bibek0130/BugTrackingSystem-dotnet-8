using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BugTrackingSystem.Server.Models
{
    public class Bugs
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName ="nvarchar(100)")]
        public string? Title { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string? Description { get; set; }
        [Column(TypeName = "nvarchar(16)")]
        public string? Status { get; set; }
        [Column(TypeName = "nvarchar(16)")]
        public string? Severity { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
