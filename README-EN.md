# ReactJS - lecture

### Content
  - first-app - first React application, basic principles explained
  - tictactoe - TicTacToe React appplication
  - tictactoeAPI - TicTacToe API - .NET project
  - index.js - explanation of basic ES6 principles

### Tasks 
1. Set initial state - i.e. clear the board
2. Load list of all players and display it
3. After refreshing the page, all last games under my name are loaded
4. Possibility to input a name to a input field and load all games saved under that name
5. After clicking on a specific saved game in a list, load it into the playing board
6. Instead of manually inserting the name of the player to load his games, just click his name in the list to load (and it is visible which player is selected) 
7. Currently selected player is used for sending games

### Provided API endpoints

Base address: http://192.168.6.25:1230

**GET:**

- /get - get all saved boards
- /getLatestByName/Patrik - get last game under the input players name (here "Patrik")
- /getBoardsStringGroupedByName - gets an array of objects which contain name of the player and all his saved games
- /getAllOwnerNames - an array of all players who have saved game


**POST:**

- /save

Message example:
```
{
  "OwnerName":"Patrik",
  "BoardBackupString":"[\"x\",\"x\",\"o\",\"o\",\"o\",\"x\",\"x\",\"\",\"\"]"
}
```

