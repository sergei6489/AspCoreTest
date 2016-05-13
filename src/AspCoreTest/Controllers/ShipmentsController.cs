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
    public class ShipmentsController : Controller
    {
        private IShipmentRepository repository;
        public ShipmentsController( IShipmentRepository repository )
        {
            this.repository = repository;
        }

        [HttpPost]
        public PagerViewModel<ShipmentViewModel> Get( [FromBody] SearchViewModel search )
        {
            int count;
            var list = repository.Get( search.pageNumber, search.itemCount, null, out count );
            var data = new PagerViewModel<ShipmentViewModel>()
            {
                Result = AutoMapper.Mapper.Map<List<Shipment>, List<ShipmentViewModel>>( list ),
                CountPage = count
            };
            return data;
        }


        public ShipmentViewModel GetShipment( int id )
        {
            return AutoMapper.Mapper.Map<Shipment, ShipmentViewModel>( repository.GetById( id ) );
        }

        [HttpPost]
        public void Set(ShipmentViewModel shipment)
        {
            var data = AutoMapper.Mapper.Map<ShipmentViewModel, Shipment>( shipment );
            repository.InsertOrUpdate( data );
        }

        public JsonResult GetDirections( string data )
        {
            List<string> list = new List<string>();
            list.Add( "Moscow" );
            list.Add( "Madrid" );
            list.Add( "Minsk" );
            return Json( list );
        }
    }
}
