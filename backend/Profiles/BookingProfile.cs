﻿using AutoMapper;
using BookingApp.Daos;
using BookingApp.Models;
using BookingApp.ViewModels;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<BookingPlaceDao, BookingPlaceViewModel>();
        CreateMap<BookingPlaceViewModel, BookingPlaceDao>();
        CreateMap<BookingDao, BookingViewModel>();
        CreateMap<BookingViewModel, BookingDao>();
        CreateMap<BookingPlaceDao, BookingPlaceWithBookingsViewModel>();
        CreateMap<BookingPlaceWithBookingsViewModel, BookingPlaceDao>();
        CreateMap<FloorDao, FloorViewModel>();
        CreateMap<FloorViewModel, FloorDao>();
        CreateMap<FloorDao, FloorSimpleViewModel>();
        CreateMap<FloorSimpleViewModel, FloorDao>();
        CreateMap<User, UserViewModel>();
        CreateMap<UserModel, UserViewModel>();
    }
}