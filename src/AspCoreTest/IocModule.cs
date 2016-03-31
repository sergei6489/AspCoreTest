using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspCoreTest.EF;
using AspCoreTest.Repository;
using Autofac;

namespace AspCoreTest
{
    public class IocModule : Module
    {
        protected override void Load( ContainerBuilder builder )
        {
            builder.RegisterType<ApplicationDBContext>().AsSelf();
            builder.RegisterType<UserRepository>().As<IUserRepository>();
            builder.RegisterType<ProductRepository>().As<IProductRepository>();
            builder.RegisterType<HttpContextHelper>().AsSelf();
            builder.RegisterType<CartRepository>().AsSelf();
            builder.RegisterType<SessionCartRepository>().AsSelf();
            builder.Register<ICartRepository>( x =>  !x.Resolve<HttpContextHelper>().Context.User.Identity.IsAuthenticated ? x.Resolve<CartRepository>() : (ICartRepository) x.Resolve<SessionCartRepository>() );
        }
    }
}
