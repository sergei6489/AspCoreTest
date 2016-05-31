using System;
using System.Collections.Generic;
using System.Linq;

namespace AspCoreTest.Models
{
    public class ShipmentViewModel
    {
        public int id { get; set; }
        public string from { get; set; }
        public string to { get; set; }
        public DateTime dateTimeOut { get; set; }
        public DateTime dateTimeInput { get; set; }
        public List<int> places { get; set; }
        public decimal price { get; set; }
    }
}