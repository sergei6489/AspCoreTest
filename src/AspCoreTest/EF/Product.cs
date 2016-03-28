using System;
using System.Collections.Generic;
using System.Linq;

namespace AspCoreTest.EF
{
    public class Product
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public bool IsDeleted { get; set; }
        public byte[] Image { get; set; }    
    }
}