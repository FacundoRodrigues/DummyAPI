using DummyAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace DummyAPI.Context
{
    public class BookDb : DbContext
    {
        public BookDb(DbContextOptions<BookDb> options)
            : base(options) { }

        public DbSet<Book> Books => Set<Book>();
    }
}