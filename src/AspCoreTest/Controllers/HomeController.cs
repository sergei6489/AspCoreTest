using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspCoreTest.EF;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AspCoreTest.Controllers
{
    [Route( "[controller]" ), Route( "/" )]
    public class HomeController : Controller
    {
        ApplicationDBContext context;
        public HomeController( ApplicationDBContext context)
        {
            this.context = context;
        }
      
        [Route( "[action]" ), Route( "" )]
        public IActionResult Index()
        {
            try
            {


                var hh = context.Users.ToList();
            }catch(Exception ex)
            {

            }
            return View();
        }
    }
}
