using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspCoreTest.EF;

namespace AspCoreTest.Models
{
    public class CartShipmentViewModel
    {
        public virtual ShipmentViewModel Shipment { get; set; }
        public virtual List<UserShipment> UserShipments { get; set; }
    }
}
