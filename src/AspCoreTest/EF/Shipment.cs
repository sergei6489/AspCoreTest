using System;
using System.Collections.Generic;
using System.Linq;

namespace AspCoreTest.EF
{
    public class Shipment
    {
        public int Id { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public decimal Price { get; set; }
        public bool IsDelete { get; set; }
        public virtual ICollection<ShipmentDate> Shipments { get; set; }
    }
}