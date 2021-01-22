using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System.Collections.Generic;

namespace Backend.Models{

    [Table("Pool")]
    public class Pool {

        [Key]
        [Column("ID")]
        public int ID { get; set;}

        [Column("Name")]
        [MaxLength(255)]
        public string Name { get; set; }

        [Column("NumOfSlides")]
        public int NumOfSlides { get; set; }
        
        [Column("Capacity")]
        public int Capacity { get; set; }

        [Column("X")]
        public int X { get; set; }

        [Column("Y")]
        public int Y { get; set; }

        public virtual List<Slide> Slides { get; set;}

        [JsonIgnore]
        public Park Park { get; set; }
    }
}