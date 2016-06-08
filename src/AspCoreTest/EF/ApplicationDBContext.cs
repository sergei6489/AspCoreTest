using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AspCoreTest.EF
{
    public class ApplicationDBContext: IdentityDbContext<User>
    {
        public DbSet<Shipment> Shipments { get; set; }
        public DbSet<UserTravel> CartShipments { get; set; }
        public DbSet<UserShipment> UserShipments { get; set; }
    }
}
