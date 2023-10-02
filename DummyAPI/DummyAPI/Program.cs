using DummyAPI.Context;
using DummyAPI.Model;
using Microsoft.EntityFrameworkCore;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddDbContext<BookDb>(opt => opt.UseInMemoryDatabase("BookList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

app.MapGet("/Bookitems", async (BookDb db) =>
    await db.Books.ToListAsync());

app.MapGet("/Bookitems/{id}", async (int id, BookDb db) =>
    await db.Books.FindAsync(id)
        is Book Book
        ? Results.Ok(Book)
        : Results.NotFound());

app.MapPost("/Bookitems", async (Book Book, BookDb db) =>
{
    db.Books.Add(Book);
    await db.SaveChangesAsync();

    return Results.Created($"/Bookitems/{Book.Id}", Book);
});

app.MapPut("/Bookitems/{id}", async (int id, Book inputBook, BookDb db) =>
{
    var Book = await db.Books.FindAsync(id);

    if (Book is null) return Results.NotFound();

    Book.Title = inputBook.Title;
    Book.Author = inputBook.Author;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/Bookitems/{id}", async (int id, BookDb db) =>
{
    if (await db.Books.FindAsync(id) is Book Book)
    {
        db.Books.Remove(Book);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

app.Run();