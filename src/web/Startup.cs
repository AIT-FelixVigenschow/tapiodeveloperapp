using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Aitgmbh.Tapio.Developerapp.Web
{
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Info Code Smell",
        "S1309:Track uses of in-source issue suppressions", Justification = "<Pending>")]
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
#pragma warning disable S2325 // Methods and properties that don't access instance data should be static
        public void ConfigureServices(IServiceCollection services)
#pragma warning restore S2325 // Methods and properties that don't access instance data should be static
        {
            services
                .AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
#pragma warning disable S2325 // Methods and properties that don't access instance data should be static
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
#pragma warning restore S2325 // Methods and properties that don't access instance data should be static
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.Use(async (context, next) =>
            {
              var path = context.Request.Path.Value;
              if (!path.StartsWith("/api", StringComparison.OrdinalIgnoreCase) && !path.StartsWith("/hubs", StringComparison.OrdinalIgnoreCase) && !Path.HasExtension(path))
              {
                  context.Request.Path = "/index.html";
              }

              await next();
            });

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
