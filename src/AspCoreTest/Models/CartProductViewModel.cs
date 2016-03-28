using System;
using System.Collections.Generic;
using System.Linq;

namespace AspCoreTest.Models
{
    public class CartProductViewModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int Count { get; set; }
    }
}