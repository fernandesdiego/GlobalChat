using Microsoft.EntityFrameworkCore;

namespace GlobalChat.Data
{
    class AppDbContext : DbContext
    {                
        
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {            
        }
        public AppDbContext()
        {
            
        }
    }
}