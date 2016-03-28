using System;
using System.Collections.Generic;
using System.Linq;

namespace AspCoreTest.EF
{
    public class UserCartProduct
    {
        public int ID { get; set; }
        public virtual User User { get; set; }
        public virtual Product Product { get; set; }
        public virtual int Count { get; set; }
    }
}