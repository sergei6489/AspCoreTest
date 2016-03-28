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

            if( env.IsDevelopment() )
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            //services.TryAdd( ServiceDescriptor.Scoped<IRoleStore<SiteRole>, RoleStore<SiteRole>>() );
            services.AddMvc();
            // добавление ApplicationDbContext для взаимодействия с базой данных учетных записей
            services.AddEntityFramework()
                .AddSqlServer()
                .AddDbContext<ApplicationDBContext>( options =>
                     options.UseSqlServer( Configuration["Data:DefaultConnection:ConnectionString"] ) );

            // добавление сервисов Idenity
            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDBContext>()
                .AddDefaultTokenProviders();
            services.AddTransient<HttpContextHelper>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure( IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory )
        {
            app.UseIISPlatformHandler( options => options.AuthenticationDescriptions.Clear() );
            app.UseMvc( routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}" );
            } );

        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
