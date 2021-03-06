using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using QuickDemo.Models;
using QuickDemo.QuickDemo.Model.Models;

namespace QuickDemo.QuickDemo.DAL.DataEntities
{
    public class QuickDemoDbContext : DbContext
    {
        public QuickDemoDbContext(DbContextOptions<QuickDemoDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> User { get; set; }
    }
}
