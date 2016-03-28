using System;
using System.Collections.Generic;
using System.Linq;
using AspCoreTest.EF;

namespace AspCoreTest.Models
{
    public class CartViewModel
    {
        public List<CartProductViewModel> Products { get; set; }
        public int Count
        {
            get
            {
                return Products.Count;
            }
        }
        public decimal TotalPrice
        {
            get
            {
                return Products.Sum( n => n.Price * n.Count );
            }
        }
    }
}