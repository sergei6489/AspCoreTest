using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;

namespace AspCoreTest.EF
{
    public class ApplicationDBContext: IdentityDbContext<User>
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<UserCartProduct> CartProducts { get; set; }
    }
}
