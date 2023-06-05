using TicTacToeAPI.Models;

namespace TicTacToeAPI.DAL;

public interface IBoardDal
{
    public Task<IEnumerable<Board>> GetBoards();
    public Task<Board> GetBoardById(Guid id);
    public Task<Board> GetLatestBoardByName(string name);
    public Task<IEnumerable<string>> GetAllOwnersNames();
    public Task<bool> SaveBoard(Board board);
}

