using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspCoreTest.EF;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace AspCoreTest
{
    public class Startup
    {
        public Startup( IHostingEnvironment env )
        {
            var builder = new ConfigurationBuilder()
                  .SetBasePath( env.ContentRootPath )
                  .AddJsonFile( "appsettings.json", optional: true, reloadOnChange: true )
                  .AddJsonFile( $"appsettings.{env.EnvironmentName}.json", optional: true );

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }
        public IConfigurationRoot Configuration { get; set; }
        public IServiceProvider ConfigureServices( IServiceCollection services )
        {
            services.AddMvc();
            services.AddDbContext<ApplicationDBContext>( options =>
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
                        data.Shipments.Add( new Shipment() { From = "Minsk", To = "Moscow", IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Barcelona", To = "Moscow", IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Minsk", To = "Barcelona", IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "NewYork", To = "Moscow", IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Minsk", To = "Moscow", IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Minsk", To = "NewYork", IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Bagdad", To = "Moscow", IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Minsk", To = "Moscow", IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Minsk", To = "Bagdad", IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Bagdad", To = "Barcelona", IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Minsk", To = "Moscow", IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Minsk", To = "Bagdad", IsDelete = false, Price = 345 } );
                        data.Shipments.Add( new Shipment() { From = "Minsk", To = "Moscow", IsDelete = false, Price = 345 } );

                        data.SaveChanges();
                        TimeSpan timeout = new TimeSpan( 0, 13, 0 );
                        TimeSpan timeinput = new TimeSpan( 3, 0, 0 );
                        data.Shipments.ToList().ForEach( ship => {
                            timeout = timeout.Add( new TimeSpan(0,20,0) );
                            timeinput = timeinput.Add( new TimeSpan( 0, 20, 0 ) );
                            data.ShipmentDates.Add( new ShipmentDate() { TimeInput = timeinput, TimeOut = timeout, TimeOutDayOfWeek = DayOfWeek.Sunday, TimeInputDayOfWeek = DayOfWeek.Friday, Shipment = ship } );
                            data.ShipmentDates.Add( new ShipmentDate() { TimeInput = timeinput, TimeOut = timeout, TimeOutDayOfWeek = DayOfWeek.Wednesday, TimeInputDayOfWeek = DayOfWeek.Friday, Shipment = ship } );
                            data.ShipmentDates.Add( new ShipmentDate() { TimeInput = timeinput, TimeOut = timeout, TimeOutDayOfWeek = DayOfWeek.Friday, TimeInputDayOfWeek = DayOfWeek.Friday, Shipment = ship } );
                            data.ShipmentDates.Add( new ShipmentDate() { TimeInput = timeinput, TimeOut = timeout, TimeOutDayOfWeek = DayOfWeek.Monday, TimeInputDayOfWeek = DayOfWeek.Friday, Shipment = ship } );
                        } );
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
            app.UseMvc( routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}" );
            } );

        }
    }
}
