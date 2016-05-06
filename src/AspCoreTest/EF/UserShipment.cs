using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspCoreTest.EF
{
    public class UserShipment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public virtual User User { get; set; }
        public virtual Shipment Shipment { get; set; }
        public virtual ICollection<UserTravel> UserTravel { get; set; }
    }
}
