using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspCoreTest.EF
{
    public class UserTravel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public int Place { get; set; }
        public virtual Shipment Shipment { get; set; }
    }
}
