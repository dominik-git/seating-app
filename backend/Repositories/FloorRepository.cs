using BookingApp.Daos;
using BookingApp.Database;
using BookingApp.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BookingApp.Repositories
{
    public class FloorRepository : IFloorRepository
    {

        private readonly ApplicationDbContext _context;

        public FloorRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<FloorDao> CreateAsync(FloorDao floor)
        {
            var createdDao = await _context.Floors.AddAsync(floor);
            await _context.SaveChangesAsync();
            return createdDao.Entity;
        }

        public async Task DeleteAsync(int id)
        {
            var floorDao = await _context.Floors.FindAsync(id);
            if (floorDao != null)
            {
                _context.Floors.Remove(floorDao);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<FloorDao>> GetAllAsync()
        {
            return await _context.Floors.ToListAsync();
        }

        public async Task<FloorDao> GetAsync(int id)
        {
            return await _context.Floors.FindAsync(id);
        }

        public async Task<FloorDao> UpdateAsync(FloorDao floor)
        {
            var existingDao = await _context.Floors.FirstOrDefaultAsync(item => item.Id == floor.Id);
            if (existingDao != null)
            {
                existingDao.Name = floor.Name;
                existingDao.Description = floor.Description;
                await _context.SaveChangesAsync();
                return existingDao;
            }
            return null;
        }
    }
}
