using TicTacToeAPI.Models;
using TicTacToeAPI.Storage;

namespace TicTacToeAPI.DAL;

public class BoardMemoryDal : IBoardDal
{
    private readonly DataStorage _dataStorage;

    public BoardMemoryDal(DataStorage dataStorage)
    {
        _dataStorage = dataStorage;
    }

    public Task<IEnumerable<Board>> GetBoards()
        => Task.FromResult(_dataStorage.Boards);

    public Task<Board> GetBoardById(Guid id)
        => Task.FromResult(_dataStorage.Boards.SingleOrDefault(x => x.Id == id));

    public Task<Board> GetLatestBoardByName(string name)
        => Task.FromResult(
                _dataStorage.Boards
                    .Where(x => x.OwnerName == name)
                    .OrderBy(x => x.Created)
                    .LastOrDefault()
            );

    public Task<bool> SaveBoard(Board board)
    {
        var boards = _dataStorage.Boards as List<Board>;

        if (boards == null)
        {
            return Task.FromResult(false);
        }

        boards.Add(board);

        return Task.FromResult(true);
    }

    public Task<IEnumerable<string>> GetAllOwnersNames()
        => Task.FromResult(_dataStorage.Boards.Select(x => x.OwnerName).Distinct());
}
