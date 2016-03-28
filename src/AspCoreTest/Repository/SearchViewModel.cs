using System;
using System.Collections.Generic;
using System.Linq;

namespace AspCoreTest.Repository
{
    public class SearchViewModel
    {
        public string Category { get; set; }
        public decimal? SmallPrice { get; set; }
        public decimal? HightPrice { get; set; }
        public string Name { get; set; }
    }
}