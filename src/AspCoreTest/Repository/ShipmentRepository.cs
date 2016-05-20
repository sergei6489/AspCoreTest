using System;
using System.Collections.Generic;
using System.Linq;
using AspCoreTest.EF;
using AspCoreTest.Models;

namespace AspCoreTest.Repository
{
    public interface IShipmentRepository: IBaseRepository
    {
        List<Shipment> Get( int index, int count, SearchViewModel search, out int PageCount );
        Shipment GetById( int id );
        void InsertOrUpdate( Shipment product );
        void Delete( int id );
    }

    public class ShipmentRepository : IShipmentRepository
    {
        private ApplicationDBContext context;
        public ShipmentRepository( ApplicationDBContext context)
        {
            this.context = context;
        }

        public List<Shipment> Get( int index, int count, SearchViewModel search, out int pageCount )
        {
            var baseQuery = context.Shipments.Where( n => !n.IsDelete );
            if( search != null )
            {
                if( search.HighestPrice.HasValue )
                {
                    baseQuery = baseQuery.Where( n => n.Price < search.HighestPrice );
                }
                if( search.SmallestPrice.HasValue )
                {
                    baseQuery = baseQuery.Where( n => n.Price > search.SmallestPrice );
                }
            }
            pageCount = (int) Math.Ceiling( (double) baseQuery.Count() / count);
            return baseQuery.Skip( (index-1) * count ).Take( count ).ToList();
        }

        public void Delete( int id )
        {
          context.CartShipments.RemoveRange( context.CartShipments.Where( n => n.Id == id ));        
        }

        public void InsertOrUpdate( Shipment shipment )
        {
            if( shipment.Id == 0)
            {
               context.Shipments.Add( shipment );
            }
            else
            {
                var prod = context.Shipments.FirstOrDefault( n => n.Id == shipment.Id );
                if( prod == null )
                {
                    throw new NullReferenceException( "Товар отсутствует" );
                }
                else
                {
                    prod.DateTimeInput = shipment.DateTimeInput;
                    prod.Price = shipment.Price;
                    prod.DateTimeOut = shipment.DateTimeOut;
                    prod.IsDelete = shipment.IsDelete;
                    prod.To = shipment.To;
                }
            }
        }

        public Shipment GetById( int id )
        {
            return context.Shipments.FirstOrDefault( m => m.Id == id );
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }
    }
}