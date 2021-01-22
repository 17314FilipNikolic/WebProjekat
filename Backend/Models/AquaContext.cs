using Microsoft.EntityFrameworkCore;
namespace Backend.Models{
    public class AquaContext : DbContext
    {
        public DbSet<Park> Parks { get; set; }

        public DbSet<Pool> Pools  { get; set; }

        public DbSet<Slide> Slides { get; set; }

        public AquaContext(DbContextOptions options) : base(options)
        {

        }
    }
}