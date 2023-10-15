using TicTacToeAPI.Models;

namespace TicTacToeAPI.Storage;
public class DataStorage
{
    public IEnumerable<Board> Boards { get; set; }

    public DataStorage()
    {
        Boards = new List<Board>();
    }
}
