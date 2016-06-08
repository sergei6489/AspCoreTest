using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace AspCoreTest
{
    public class HttpContextHelper
    {
        private HttpContext context;
        public HttpContextHelper( IHttpContextAccessor contextAccessor )
        {
            this.context = contextAccessor.HttpContext;
        }
        public HttpContext Context { get { return context; } }

        public ISession Session { get { return context.Session; } }
    }
}
