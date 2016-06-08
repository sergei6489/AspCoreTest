using System;
using System.Collections.Generic;
using System.Linq;
using AspCoreTest.EF;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace AspCoreTest.Repository
{
    public interface IUserRepository
    {
        User GetById( string id );
        User GetByName( string name );
        void DeleteById( string id );
        User GetCurrentUser();
        void AddUser( User user );
    }

    public class UserRepository : IUserRepository
    {
        private ApplicationDBContext context;
        private HttpContext httpContext;
        private UserManager<User> userManager;
        public UserRepository( ApplicationDBContext context,HttpContextHelper httpcontext, UserManager<User> userManager )
        {
            this.context = context;
            this.httpContext = httpcontext.Context;
            this.userManager = userManager;
        }

        public void DeleteById( string id )
        {
            context.Users.Remove( context.Users.FirstOrDefault( n => n.Id == id ) );
        }

        public User GetById( string id )
        {
            return context.Users.FirstOrDefault( n => n.Id == id );
        }

        public User GetByName( string name )
        {
            return context.Users.FirstOrDefault( n => n.UserName == name );
        }

        public User GetCurrentUser()
        {
            return context.Users.FirstOrDefault( n => n.UserName ==  httpContext.User.Identity.Name );
        }

        public void AddUser( User user )
        {
            if (GetByName(user.UserName)!=null)
            {
                throw new Exception( "Пользователь с таким логином уже присутствует в системе" );
            }
            else
            {
                context.Users.Add( user );
            }
          
        }
    }
}