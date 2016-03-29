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
        public void ConfigureServices( IServiceCollection services )
        {
            services.AddEntityFramework()
            .AddSqlServer()
            .AddDbContext<ApplicationDBContext>( options =>
                 options.UseSqlServer( Configuration["Data:DefaultConnection:ConnectionString"] ) );

            // добавление сервисов Idenity
            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDBContext>()
                .AddDefaultTokenProviders();
            services.AddTransient<HttpContextHelper>();
            
            services.AddMvc();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure( IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory )
        {
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
            app.UseIdentity();
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
