using System;
using System.Collections.Generic;
using System.Linq;
using AspCoreTest.EF;

namespace AspCoreTest.Models
{
    public class CartViewModel
    {
        public List<CartShipmentViewModel> UserShipment { get; set; }
        public int Count
        {
            get
            {
                return UserShipment.Count;
            }
        }
        public decimal TotalPrice
        {
            get
            {
                return UserShipment.Sum( n => n.UserShipments.Count * n.Shipment.Price );
            }
        }
    }
}