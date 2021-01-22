using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AquaController : ControllerBase
    {
        public AquaContext Context { get; set; }
        public AquaController(AquaContext context)
        {
            Context = context;
        }

        [Route("PreuzmiParkove")]
        [HttpGet]
        public async Task<List<Park>> PreuzmiParkove(){
            return await Context.Parks.Include(p => p.Pools).ThenInclude(p => p.Slides).ToListAsync();
        }

        [Route("UpisiPark")]
        [HttpPost]
        public async Task UpisiVrt([FromBody] Park park){
            Context.Parks.Add(park);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniPark")]
        [HttpPut]
        public async Task IzmeniPark([FromBody] Park park){
            Context.Update<Park>(park);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiPark/{id}")]
        [HttpDelete]
        public async Task IzbrisiPark(int id){
            var park = await Context.Parks.FindAsync(id);
            Context.Remove(park);
            await Context.SaveChangesAsync();
        }

        [Route("UpisiPool/{idPark}")]
        [HttpPost]
        public async Task<IActionResult> UpisiPool(int idPark, [FromBody] Pool pool){
            var park = await Context.Parks.FindAsync(idPark);
            pool.Park = park;
            pool.Capacity = park.Capacity;

            if (Context.Pools.Any(p => p.Name == pool.Name && (p.X != pool.X || p.Y != pool.Y)))
            {
                var pool1 = Context.Pools.Where(p => p.Name == pool.Name).FirstOrDefault();
                return BadRequest(new { X = pool1?.X, Y = pool1?.Y });
            }
            else {
                Context.Pools.Add(pool);
                await Context.SaveChangesAsync();
                return Ok();
            }
        }

        [Route("IzbrisiPool/{idPool}")]
        [HttpDelete]
        public async Task IzbrisiPool(int id){
            var pool = await Context.Pools.FindAsync(id);
            Context.Remove(pool);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniPool")]
        [HttpPut]
        public async Task IzmeniPark([FromBody] Pool pool){
            Context.Update<Pool>(pool);
            await Context.SaveChangesAsync();
        }

        [Route("PreuzmiPool")]
        [HttpGet]
        public async Task<List<Pool>> PreuzmiPool(){
            return await Context.Pools.Include(p => p.Slides).ToListAsync();
        }

        [Route("PreuzmiSlide")]
        [HttpGet]
        public async Task<List<Slide>> PreuzmiSlide(){
            return await Context.Slides.ToListAsync();
        }

        [Route("UpisiSlide/{idPool}")]
        [HttpPost]
        public async Task<IActionResult> UpisiSlide(int idPool, [FromBody] Slide slide){
            var pool = await Context.Pools.FindAsync(idPool);
            slide.Pool = pool;
            slide.PoolID = pool.ID;

            if(pool.Capacity < pool.NumOfSlides + slide.NumOfSlides){
                return StatusCode(400);
            }
            if (Context.Slides.Any(s => s.Type == slide.Type)){
                return StatusCode(406);
            }
            pool.NumOfSlides += slide.NumOfSlides;
            Context.Add(slide);
            await Context.SaveChangesAsync();
            return Ok();
        }

        [Route("IzbrisiSlide/{idSlide}")]
        [HttpDelete]
        public async Task IzbrisiSlide(int id){
            var slide = await Context.Slides.FindAsync(id);
            slide.Pool.NumOfSlides -= slide.NumOfSlides;
            Context.Remove(slide);
            await Context.SaveChangesAsync();
        }
    }
}
