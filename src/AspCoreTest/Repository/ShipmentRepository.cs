using System;
using System.Collections.Generic;
using System.Linq;
using AspCoreTest.EF;
using AspCoreTest.Models;
using Microsoft.EntityFrameworkCore;

namespace AspCoreTest.Repository
{
    public interface IShipmentRepository : IBaseRepository
    {
        List<Shipment> Get( int index, int count, SearchViewModel search, out int PageCount );
        Shipment GetById( int id );
        void InsertOrUpdate( Shipment product );
        void Delete( int id );
        List<string> GetDirectionsFrom( string value );
        List<string> GetDirectionsTo( string value );
    }

    public class ShipmentRepository : IShipmentRepository
    {
        private ApplicationDBContext context;
        public ShipmentRepository( ApplicationDBContext context )
        {
            this.context = context;
        }

        public List<Shipment> Get( int index, int count, SearchViewModel search, out int pageCount )
        {
            var baseQuery = context.Shipments.Where( n => !n.IsDelete );
            if( search != null )
            {
                if( search.highestPrice.HasValue )
                {
                    baseQuery = baseQuery.Where( n => n.Price < search.highestPrice );
                }
                if( search.smallestPrice.HasValue )
                {
                    baseQuery = baseQuery.Where( n => n.Price > search.smallestPrice );
                }
                if( search.from != null )
                {
                    baseQuery = baseQuery.Where( n => n.From == search.from );
                }
                if( search.to != null )
                {
                    baseQuery = baseQuery.Where( m => m.To == search.to );
                }
            }
            var hh = context.Shipments.ToList();
            pageCount = (int)Math.Ceiling( (double)baseQuery.Count() / count );
            return baseQuery.Skip( (index - 1) * count ).Take( count ).Include(n=>n.Shipments).ToList();
        }

        public void Delete( int id )
        {
            context.CartShipments.RemoveRange( context.CartShipments.Where( n => n.Id == id ) );
        }

        public void InsertOrUpdate( Shipment shipment )
        {
            if( shipment.Id == 0 )
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
                    prod.Price = shipment.Price;
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

        public List<string> GetDirectionsFrom(string value)
        {
            if (String.IsNullOrEmpty(value))
            {
                return context.Shipments.Where( n => n.From.Contains( value ) ).Select( n => n.From ).Distinct().Take( 20 ).ToList();
            }
            else
            {
                return context.Shipments.Where( n => n.From.Contains( value ) ).Select( n => n.From ).Distinct().Take( 20 ).ToList();
            }
        }
        public List<string> GetDirectionsTo( string value)
        {
            if( String.IsNullOrEmpty( value ) )
            {
                return context.Shipments.Where( n => n.To.Contains( value ) ).Select( n => n.To ).Distinct().Take( 20 ).ToList();
            }
            else
            {
                return context.Shipments.Where( n => n.To.Contains( value ) ).Select( n => n.To ).Distinct().Take( 20 ).ToList();
            }
        }
    }
}