using System;
using System.Collections.Generic;
using System.Linq;
using AspCoreTest.EF;
using AspCoreTest.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Http; 
namespace AspCoreTest.Repository
{
    public class SessionCartRepository : ICartRepository
    {
        #region primary
        string key = "CartKey";
        private List<SessionCart> CartFromSession
        {
            get
            {
                return httpContext.Session.GetObjectFromJson<List<SessionCart>>( key);
            }
            set
            {
                httpContext.Session.SetObjectAsJson(key, value == null ? new List<SessionCart>() : value);
            }
        }

        private string UserName
        {
            get
            {
               return httpContext.User.Identity.Name;
            }
        }
        #endregion

        private ApplicationDBContext context;
        private HttpContext httpContext;
        public SessionCartRepository( ApplicationDBContext context, HttpContextHelper httpContext )
        {
            this.context = context;
            this.httpContext = httpContext.Context;
        }

        public void DecrementProduct( int idProduct )
        {
            throw new NotImplementedException();
        }

        public List<UserCartProduct> GetCart()
        {
            var data = CartFromSession;
            var products = context.Products.Where( n => CartFromSession.Select( m => m.ProductId ).Contains( n.ID ) );
            return products.Select( n => new UserCartProduct()
            {
                Count = data.FirstOrDefault( m => m.ProductId == n.ID ).Count,
                ID = n.ID,
                Product = n,
                User = null
            } ).ToList();
        }

        public void IncrementProduct( int idProduct )
        {
            throw new NotImplementedException();
        }

        public void RemoveProduct( int idProduct )
        {
            throw new NotImplementedException();
        }

        public void RemoveProductFromCart( int idProduct )
        {
            throw new NotImplementedException();
        }

        public void SetProductCount( int idProd, int count )
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            throw new NotImplementedException();
        }
    }
}