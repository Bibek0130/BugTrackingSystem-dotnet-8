using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BugTrackingSystem.Server.Data;
using BugTrackingSystem.Server.Models;
using BugTrackingSystem.Server.Models.DTO;

namespace BugTrackingSystem.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BugsController : ControllerBase
    {
        private readonly AppDbContext _context;

        //add AppDbContext as a parameter
        public BugsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Bugs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bugs>>> GetBugs(int pageSize, int pageNumber )
        {
            var data = _context.Bugs;
            var paginationData = data
                 .Skip((pageNumber -1) * pageSize)
                .Take(pageSize);
               
                
            return await paginationData.ToListAsync();
        }

        // GET: api/Bugs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bugs>> GetBugs(int id)
        {
            var bugs = await _context.Bugs.FindAsync(id);

            if (bugs == null)
            {
                return NotFound();
            }

            return bugs;
        }

        // PUT: api/Bugs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBugs(int id, Bugs bugs)
        {
            id = bugs.Id;

            _context.Entry(bugs).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BugsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Bugs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Bugs>> PostBugs(Bugs bugs)
        {
            _context.Bugs.Add(bugs);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBugs", new { id = bugs.Id }, bugs);
        }

        // DELETE: api/Bugs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBugs(int id)
        {
            var bugs = await _context.Bugs.FindAsync(id);
            if (bugs == null)
            {
                return NotFound();
            }

            _context.Bugs.Remove(bugs);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //Data using stored procedure
        //_context.FromSql("spName 'parameter 1' 'parameter 2' ");
        [HttpGet("sp-GetBugsById")]
        public async Task<ActionResult> GetBugsFromSP(int id)
        {
            
            try
            {
                //lets use FromSqlInterpolated for safe parametrization
                var data = await _context.BugDTO.FromSqlInterpolated($"EXEC [dbo].[spBugs] @id = {id}, @flag = {"getBugsById"}").ToListAsync();

                var dd = data;
                if (dd == null || !data.Any())
                {
                    return NotFound(new { message = $"No bugs found for ID {id}" });
                }               

                //return response
                return Ok(dd);
            }
            catch(Exception ex)
            {
                Console.WriteLine($"Exception occured at:  {ex.Message}");
                var error = "An unexpected error occured. Please try again later.";
                return StatusCode(500, new { message = error });
            }           
        }

        private bool BugsExists(int id)
        {
            return _context.Bugs.Any(e => e.Id == id);
        }
    }
}
