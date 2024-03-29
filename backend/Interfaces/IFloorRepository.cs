﻿using BookingApp.Daos;

namespace BookingApp.Interfaces
{
    public interface IFloorRepository
    {
        Task<FloorDao> GetAsync(int id);
        Task<FloorDao> CreateAsync(FloorDao floor);
        Task<FloorDao> UpdateAsync(FloorDao floor);
        Task DeleteAsync(int id);
        Task<IEnumerable<FloorDao>> GetAllAsync();
    }
}
