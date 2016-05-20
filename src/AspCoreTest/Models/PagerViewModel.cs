using System;
using System.Collections.Generic;
using System.Linq;

namespace AspCoreTest.Models
{
    public class PagerViewModel<T>
    {
        public int PageCount { get; set; }
        public List<T> Result { get; set; }
    }
}