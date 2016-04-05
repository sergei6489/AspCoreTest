using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspCoreTest.EF;
using AspCoreTest.Models;
using AutoMapper;

namespace AspCoreTest
{
    public static class AutoMapper
    {
        public static MapperConfiguration configuration;
        public static IMapper Mapper;
        public static void RegisterMapping()
        {
            configuration = new MapperConfiguration( ( conf ) =>
            {
                conf.CreateMap<Shipment, ShipmentViewModel>();
               // conf.CreateMap<List<Shipment>, List<ShipmentViewModel>>();
               // conf.CreateMap<UserCart, CartProductViewModel>();
            } );
            Mapper = configuration.CreateMapper();
        }
    }
}
