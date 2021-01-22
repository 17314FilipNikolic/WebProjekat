using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models{

    [Table("Slide")]
    public class Slide{

        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Type")]
        [MaxLength(255)]
        public string Type { get; set; }

        [Column("NumOfSlides")]
        public int NumOfSlides { get; set; }

        [Column("PoolID")]
        public int PoolID{ get; set; }

        [JsonIgnore]
        public Pool Pool { get; set;}
    }
}