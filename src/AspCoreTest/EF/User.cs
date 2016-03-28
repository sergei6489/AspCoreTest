using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace AspCoreTest.EF
{
    public class User: IdentityUser
    {
        public bool IsAdmin { get; set; }
    }
}