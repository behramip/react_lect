###### Not a Czech speaker? Check out [English readme](./README-EN.md)

# TicTacToe API

Tento repozitář obsahuje jednoduchý backend k web appce **tictactoe** (=piškvorky), která se programuje v rámci kurzu [intro do Reactu](../README.md).

## Lokální spuštění 

API lze lokálně spustit buďto klasicky přes `dotnet build` a `dotnet run`, nebo využít přiložený [DockerFile](./TicTacToeAPI/Dockerfile).

Image lze zbuildit lokálně, nebo lze stáhnout a spustit z DockerHubu.
```
docker pull patrikbehramiswi/tictactoe_api:latest
docker run -p 8081:80 --name tictactoe_api patrikbehramiswi/tictactoe_api:latest
```

[def]: ./README-en.md