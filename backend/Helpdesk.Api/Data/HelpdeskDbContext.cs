using Helpdesk.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Helpdesk.Api.Data;

public class HelpdeskDbContext : DbContext
{
    public HelpdeskDbContext(DbContextOptions<HelpdeskDbContext> options) : base(options)
    {
    }

    public DbSet<AppUser> Users => Set<AppUser>();
    public DbSet<AppRole> Roles => Set<AppRole>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AppRole>().ToTable("Roles");
        modelBuilder.Entity<AppRole>().HasKey(role => role.Id);
        modelBuilder.Entity<AppRole>().Property(role => role.Name).HasMaxLength(50).IsRequired();

        modelBuilder.Entity<AppUser>().ToTable("Users");
        modelBuilder.Entity<AppUser>().HasKey(user => user.Id);
        modelBuilder.Entity<AppUser>().Property(user => user.FullName).HasMaxLength(150).IsRequired();
        modelBuilder.Entity<AppUser>().Property(user => user.Email).HasMaxLength(255).IsRequired();
        modelBuilder.Entity<AppUser>().Property(user => user.PasswordHash).HasMaxLength(255).IsRequired();
    }
}

