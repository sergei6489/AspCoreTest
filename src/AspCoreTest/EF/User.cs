using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace AspCoreTest.EF
{
    public class User: IdentityUser
    {
        public bool IsAdmin { get; set; }
    }
}