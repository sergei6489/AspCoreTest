using System;
using System.Collections.Generic;
using System.Linq;

namespace AspCoreTest.Models
{
    public class ShipmentViewModel
    {
        public int Id { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public DateTime DateTimeOut { get; set; }
        public DateTime DateTimeInput { get; set; }
        public decimal Price { get; set; }
    }
}