using System;
using System.Collections.Generic;
using System.Linq;
using AspCoreTest.EF;
using AspCoreTest.Models;
using Microsoft.AspNet.Identity;

using AspCoreTest.EF;

namespace AspCoreTest.Repository
{
    public interface ICartRepository : IBaseRepository
    {
        List<UserCartProduct> GetCart();
        void SetProductCount( int idProd, int count );
        void RemoveProduct( int idProduct );
    }

    public class SessionCart
    {
        public int ProductId { get; set; }
        public int Count { get; set; }
    }

    public class CartRepository : ICartRepository
    {
        #region
        private User CurrentUser
        {
            get { return userRepository.GetCurrentUser(); }
        }
        #endregion

        #region local properties
        private ApplicationDBContext context;
        private SessionCartRepository sessionRepository;
        private IUserRepository userRepository;
        private HttpContextHelper contextHelper;
        #endregion

        public CartRepository( ApplicationDBContext context, SessionCartRepository sessionRep, IUserRepository userRepository,HttpContextHelper contextHelper )
        {
            this.context = context;
            sessionRepository = sessionRep;
            this.userRepository = userRepository;
            this.contextHelper = contextHelper;
        }

        public List<UserCartProduct> GetCart()
        {
            var user = contextHelper.Context.User;
            if( user.Identity.IsAuthenticated )
            {
                var userDB = context.Users.FirstOrDefault( n => n.UserName == user.Identity.Name );
                if( userDB == null )
                {
                    throw new Exception( "В бд отсутствует авторизованный пользователь" );
                }
                else
                {
                    //переносим из корзины сессии в бд
                    var cartProd = context.CartProducts.Where( n => n.User.Id == userDB.Id ).ToList();
                    UserCartProduct data = null;
                    sessionRepository.GetCart().ForEach( ( n ) =>
                    {
                        // проверка наличия товара в бд текущего пользователя
                        data = cartProd.FirstOrDefault( m => m.Product.ID == n.ID );
                        if( data == null )
                        {
                            // добавить в бд товар текущего пользователя
                            context.CartProducts.Add( new UserCartProduct() { Count = n.Count, Product = n.Product, User = CurrentUser } );
                        }
                        else
                        {
                            // установить количество товара в бд
                            data.Count = n.Count;
                        }
                    } );
                    return cartProd;
                }
            }
            else
            {
                throw new Exception( "Неавторизованный пользователь пытается получить корзину из бд" );
            }
        }

        public void RemoveProduct( int idProduct )
        {
            throw new NotImplementedException();
        }

        public void SetProductCount( int idProd, int count )
        {
            // Добавление товара в корзину
            var cartProd = context.CartProducts.FirstOrDefault( n => n.Product.ID == idProd );
            if( cartProd != null )
            {
                cartProd.Count++;
            }
            else
            {
                var newUserCart = new UserCartProduct();
                newUserCart.Product = context.Products.FirstOrDefault( n => n.ID == idProd );
                newUserCart.User = context.Users.FirstOrDefault( n => n.Id == CurrentUser.Id );
                newUserCart.Count = 1;
                context.CartProducts.Add( newUserCart );
            }
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }
    }
}