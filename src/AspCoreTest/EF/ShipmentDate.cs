using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspCoreTest.EF
{
    public class ShipmentDate
    {
        public int Id { get; set; }
        public virtual Shipment Shipment { get; set; }
        public TimeSpan TimeOut { get; set; }
        public TimeSpan TimeInput { get; set; }
        public DayOfWeek TimeOutDayOfWeek { get; set; }
        public DayOfWeek TimeInputDayOfWeek { get; set; }
    }
}
