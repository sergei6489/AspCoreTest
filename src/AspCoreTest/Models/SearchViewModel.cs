using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspCoreTest.Models
{
    public class SearchViewModel
    {
        public int itemCount { get; set; }
        public int pageNumber { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public DateTime DateShipment { get; set; }
        public decimal? HightPrice { get; set; }
        public decimal? SmallPrice { get; set; }
    }
}
