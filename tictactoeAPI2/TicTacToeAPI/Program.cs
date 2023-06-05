using Microsoft.AspNetCore.Diagnostics;
using TicTacToeAPI.DAL;
using TicTacToeAPI.Models;
using TicTacToeAPI.Storage;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTransient<IBoardDal, BoardMemoryDal>();
builder.Services.AddSingleton<DataStorage>();

builder.Services.AddCors();

var app = builder.Build();

app.UseCors(builder => builder
.AllowAnyOrigin()
.AllowAnyMethod()
.AllowAnyHeader());

app.UseExceptionHandler(c => c.Run(async context =>
{
    var exception = context.Features
        .Get<IExceptionHandlerFeature>()
        ?.Error;
    if (exception is not null)
    {
        var response = new { error = exception.Message };
        context.Response.StatusCode = 400;

        await context.Response.WriteAsJsonAsync(response);
    }
}));

// Configure the HTTP request pipeline.

app.MapGet("/get", async (IBoardDal boardDal)
    => await boardDal.GetBoards()
);

app.MapGet("/getById/{id}", async (IBoardDal boardDal, Guid id)
    => await boardDal.GetBoardById(id)
);

app.MapGet("/getLatestByName/{name}", async (IBoardDal boardDal, string name)
 => await boardDal.GetLatestBoardByName(name)
);

app.MapGet("/getBoardsStringGroupedByName", async (IBoardDal boardDal) =>
{
    var boards = await boardDal.GetBoards();
    var statistics = boards
                    .ToList()
                    .GroupBy(x => x.OwnerName)
                    .Select(x => new
                    {
                        Name = x.Key,
                        Boards = x.Select(xx => xx.BoardBackupString).ToList()
                    })
                    .ToList();

    return statistics;
});

app.MapGet("/getAllOwnerNames", async (IBoardDal boardDal)
    => await boardDal.GetAllOwnersNames()
);

app.MapPost("/save", async (IBoardDal boardDal, Board board) =>
{
    var newGuid = Guid.NewGuid();
    var boardToCreate = board with { Created = DateTime.Now, Id = newGuid };
    var result = await boardDal.SaveBoard(boardToCreate);

    return result ?
        Results.Created($"/getById/{newGuid}", new { Id = newGuid }) :
        Results.StatusCode(500);
});


app.Run();
