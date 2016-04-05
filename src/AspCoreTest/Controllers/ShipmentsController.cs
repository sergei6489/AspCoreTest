using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspCoreTest.EF;
using AspCoreTest.Models;
using AspCoreTest.Repository;
using Microsoft.AspNet.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AspCoreTest.Controllers
{
    [Route( "api/[controller]" )]
    public class ShipmentsController : Controller
    {
        private IShipmentRepository repository;
        public ShipmentsController( IShipmentRepository repository )
        {
            this.repository = repository;
        }
        public PagerViewModel<ShipmentViewModel> Get( int pageIndex )
        {
            int count;
            var list = repository.Get( pageIndex, 20, null, out count );
            var data = new PagerViewModel<ShipmentViewModel>()
            {
                Result = AutoMapper.Mapper.Map<List<Shipment>, List<ShipmentViewModel>>( list ),
                Count = count
            };
            return data;
        }
    }
}
