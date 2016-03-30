using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspCoreTest.Repository;
using Microsoft.AspNet.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AspCoreTest.Controllers
{
    [Route("api/[controller]")]
    public class CartController : Controller
    {
        private ICartRepository repository;
       public CartController(ICartRepository repository)
        {
            this.repository = repository;
        }
    }
}
