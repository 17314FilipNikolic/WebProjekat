using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models{

    [Table("Park")]
    public class Park{
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Name")]
        [MaxLength(255)]
        public string Name { get; set; }

        [Column("Capacity")]
        public int Capacity { get; set; }

        [Column("N")]
        public int N { get; set; }

        [Column("M")]
        public int M { get; set; }

        public virtual List<Pool> Pools { get; set; }
    }
}