using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspCoreTest.Models
{
    public class SearchViewModel
    {
        public int itemCount { get; set; }
        public int pageIndex { get; set; }
        public string from { get; set; }
        public string to { get; set; }
        public DateTime? departureDate { get; set; }
        public DateTime? returnDate { get; set; }
        public decimal? highestPrice { get; set; }
        public decimal? smallestPrice { get; set; }
    }
}
