using System;
using System.Collections.Generic;
using System.Linq;

namespace AspCoreTest.EF
{
    public class UserTravel
    {
        public int ID { get; set; }
        public virtual Shipment Shipment { get; set; }
        public virtual UserShipment UserShipment { get; set; }
    }
}