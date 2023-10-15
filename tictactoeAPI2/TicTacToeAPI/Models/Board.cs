namespace TicTacToeAPI.Models;

public record Board(Guid Id, string OwnerName, string BoardBackupString, DateTime Created);
