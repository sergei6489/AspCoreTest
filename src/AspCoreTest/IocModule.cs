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
            builder.RegisterType<ShipmentRepository>().As<IShipmentRepository>();
            builder.RegisterType<HttpContextHelper>().AsSelf();
        }
    }
}
