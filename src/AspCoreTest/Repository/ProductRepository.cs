using System;
using System.Collections.Generic;
using System.Linq;
using AspCoreTest.EF;

namespace AspCoreTest.Repository
{
    public interface IProductRepository: IBaseRepository
    {
        List<Product> Get( int index, int count, SearchViewModel search, out int PageCount );
        Product GetById( int id );
        void InsertOrUpdate( Product product );
        void Delete( int id );
    }

    public class ProductRepository : IProductRepository
    {
        private ApplicationDBContext context;
        private ICartRepository cartRepository;
        public ProductRepository( ApplicationDBContext context, ICartRepository cartRepository)
        {
            this.context = context;
            this.cartRepository = cartRepository;
        }

        public List<Product> Get( int index, int count, SearchViewModel search, out int pageCount )
        {
            var baseQuery = context.Products.Where( n => !n.IsDeleted );
            if (search.Category!=null)
            {
              baseQuery = baseQuery.Where( n => n.Category == search.Category );
            }
            if (search.HightPrice.HasValue)
            {
                baseQuery = baseQuery.Where( n => n.Price < search.HightPrice );
            }
            if (search.SmallPrice.HasValue)
            {
                baseQuery = baseQuery.Where( n => n.Price > search.SmallPrice );
            }
            pageCount = baseQuery.Count();
            return baseQuery.Skip( index * count ).Take( count ).ToList();
        }

        public void Delete( int id )
        {
          context.CartProducts.RemoveRange( context.CartProducts.Where( n => n.Product.ID == id ));        
        }

        public void InsertOrUpdate( Product product )
        {
            if( product.ID == 0)
            {
               context.Products.Add( product );
            }
            else
            {
                var prod = context.Products.FirstOrDefault( n => n.ID == product.ID );
                if( prod == null )
                {
                    throw new NullReferenceException( "Товар отсутствует" );
                }
                else
                {
                    prod.Name = product.Name;
                    prod.Price = product.Price;
                    prod.Description = product.Description;
                    prod.IsDeleted = product.IsDeleted;
                    prod.Category = product.Category;
                    prod.Image = product.Image;
                }
            }
        }

        public Product GetById( int id )
        {
            return context.Products.FirstOrDefault( m => m.ID == id );
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }
    }
}