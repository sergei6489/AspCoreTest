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
        List<ShipmentViewModel> GetCart();
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

        public List<ShipmentViewModel> GetCart()
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
                    /*
                    //переносим из корзины сессии в бд
                    var cartProd = context.CartShipments.Where( n => n.UserShipment.Any(m=>m.User.Id == userDB.Id) ).ToList();
                    UserTravel data = null;
                    sessionRepository.GetCart().ForEach( ( n ) =>
                    {
                        // проверка наличия товара в бд текущего пользователя
                        data = cartProd.FirstOrDefault( m => m.Shipment.Id == n.Id );
                        if( data == null )
                        {
                            // добавить в бд товар текущего пользователя
                            context.CartShipments.Add( null );
                        }
                    } );
                    */
                    return null;
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

        public void SaveChanges()
        {
            context.SaveChanges();
        }
    }
}