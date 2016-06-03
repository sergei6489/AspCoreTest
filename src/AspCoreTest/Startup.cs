using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspCoreTest.EF;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using Microsoft.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Extensions.Configuration;
using AspCoreTest.Repository;
using Autofac;
using Autofac.Extensions.DependencyInjection;

namespace AspCoreTest
{
    public class Startup
    {
        public Startup( IHostingEnvironment env )
        {
            // Set up configuration sources.
            var builder = new ConfigurationBuilder()
                .AddJsonFile( "appsettings.json" )
                .AddJsonFile( $"appsettings.{env.EnvironmentName}.json", optional: true );


            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }
        public IConfigurationRoot Configuration { get; set; }
        public IServiceProvider ConfigureServices( IServiceCollection services )
        {
            services.AddMvc();
            services.AddEntityFramework()
            .AddSqlServer()
            .AddDbContext<ApplicationDBContext>( options =>
                 options.UseSqlServer( Configuration["Data:DefaultConnection:ConnectionString"] ) );

            // добавление сервисов Idenity
            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDBContext>()
                .AddDefaultTokenProviders();

            var containerBuilder = new ContainerBuilder();
            containerBuilder.RegisterModule<IocModule>();
            containerBuilder.Populate( services );
            var container = containerBuilder.Build();
            return container.ResolveOptional<IServiceProvider>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure( IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory )
        {
            loggerFactory.MinimumLevel = LogLevel.Debug;

            if( env.IsDevelopment() )
            {
                #region
                try
                {
                    var data = app.ApplicationServices.GetService<ApplicationDBContext>();
                    if( !data.Users.Any( n => n.UserName == "admin" ) )
                    {
                        data.Users.Add( new User() { UserName = "admin", IsAdmin = true, PasswordHash = "", Email = "test@mail.ru", PhoneNumber = "89192734674" } );
                        data.Users.Add( new User() { UserName = "test1", IsAdmin = false, PasswordHash = "", Email = "test@mail.ru", PhoneNumber = "89192744674" } );
                        data.Users.Add( new User() { UserName = "test2", IsAdmin = false, PasswordHash = "", Email = "test@mail.ru", PhoneNumber = "89192746674" } );
                        data.Shipments.Add( new Shipment() { From = "Minsk" , To = "Moscow" , DateTimeInput = DateTime.Now, DateTimeOut = DateTime.Now.AddDays( 2 ), IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Barcelona" , To = "Moscow" , DateTimeInput = DateTime.Now.AddDays( 1 ), DateTimeOut = DateTime.Now.AddDays( 2 ), IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Minsk" , To = "Barcelona" , DateTimeInput = DateTime.Now.AddDays( 2 ), DateTimeOut = DateTime.Now.AddDays( 2 ), IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "NewYork" , To = "Moscow" , DateTimeInput = DateTime.Now.AddDays( 3 ), DateTimeOut = DateTime.Now.AddDays( 2 ), IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Minsk" , To = "Moscow" , DateTimeInput = DateTime.Now.AddDays( 4 ), DateTimeOut = DateTime.Now.AddDays( 2 ), IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Minsk" , To = "NewYork" , DateTimeInput = DateTime.Now.AddDays( 5 ), DateTimeOut = DateTime.Now.AddDays( 2 ), IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Bagdad" , To = "Moscow" , DateTimeInput = DateTime.Now.AddDays( 6 ), DateTimeOut = DateTime.Now.AddDays( 2 ), IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Minsk" , To = "Moscow" , DateTimeInput = DateTime.Now.AddDays( 4 ), DateTimeOut = DateTime.Now.AddDays( 2 ), IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Minsk" , To = "Bagdad" , DateTimeInput = DateTime.Now.AddDays( 3 ), DateTimeOut = DateTime.Now.AddDays( 2 ), IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Bagdad" , To = "Barcelona" , DateTimeInput = DateTime.Now.AddDays( 6 ), DateTimeOut = DateTime.Now.AddDays( 2 ), IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Minsk" , To = "Moscow", DateTimeInput = DateTime.Now.AddDays( 8 ), DateTimeOut = DateTime.Now.AddDays( 2 ), IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Minsk" , To = "Bagdad", DateTimeInput = DateTime.Now.AddDays( 9 ), DateTimeOut = DateTime.Now.AddDays( 2 ), IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Minsk" , To = "Moscow", DateTimeInput = DateTime.Now.AddDays( 10 ), DateTimeOut = DateTime.Now.AddDays( 2 ), IsDelete = false, Price = 345 } );
                        data.SaveChanges();
                    }
                }
                catch(Exception ex)
                {

                }
                #endregion
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler( "/Home/Error" );
                try
                {
                    using( var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>()
                        .CreateScope() )
                    {
                        serviceScope.ServiceProvider.GetService<ApplicationDBContext>()
                             .Database.Migrate();
                    }
                }
                catch { }
            }
            app.UseStaticFiles();
            app.UseIdentity();
            AutoMapper.RegisterMapping();
            app.UseIISPlatformHandler( options => options.AuthenticationDescriptions.Clear() );
            app.UseMvc( routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}" );
            } );

        }

        // Entry point for the application.
        public static void Main( string[] args ) => WebApplication.Run<Startup>( args );
    }
}
