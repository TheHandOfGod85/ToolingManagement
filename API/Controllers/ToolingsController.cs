using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ToolingsController : BaseApiController
    {
        private readonly DataContext _context;
        public ToolingsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Tooling>>> GetToolings()
        {
            return await _context.Toolings
            .Include(x => x.Product)
            .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tooling>> GetTooling(Guid id)
        {
            return await _context.Toolings
            .Include(x => x.Product)
            .FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}