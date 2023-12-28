using AutoMapper;
using BookingApp.Daos;
using BookingApp.Models;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<BookingPlaceDao, BookingPlaceViewModel>();
        CreateMap<BookingPlaceViewModel, BookingPlaceDao>();
        CreateMap<BookingDao, BookingViewModel>();
    }
}