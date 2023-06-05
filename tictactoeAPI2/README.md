# TicTacToe API

Tento repozitář obsahuje jednoduché API k piškvorkám, které se programují v rámci kurzu [intro do Reactu](../README.md).

## Lokální spuštění 

API lze lokálně spustit buďto klasicky přes `dotnet build` a `dotnet run`, nebo využít přiložený [DockerFile](./TicTacToeAPI/Dockerfile).

Image lze zbuildit lokálně, nebo lze stáhnout a spustit z DockerHubu.
```
docker pull patrikbehramiswi/tictactoe_api:latest
docker run -p 8081:80 --name tictactoe_api patrikbehramiswi/tictactoe_api:latest
```