using System;
using System.Collections.Generic;
using System.Linq;

namespace AspCoreTest.Models
{
    public enum ResultType
    {
        CriticalError=1,
        Notification=2,
        Complete=3
    }
    public class BaseViewModel<T>
    {
        public ResultType ResultType { get; set; }
        public T Result { get; set; }
        public string Message { get; set; }
    }
}