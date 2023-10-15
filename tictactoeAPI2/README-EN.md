# TicTacToe API

This repository contains simple backed for **tictactoe** web app, which is developed in scope of [intro to React lecture](../README-en.md).

## Local execution

API may be run locally via CLI commands `dotnet build` and `dotnet run`, or leverage enclosed [DockerFile](./TicTacToeAPI/Dockerfile).

Image can be built locally, or can be pulled and run from DockerHub.
```
docker pull patrikbehramiswi/tictactoe_api:latest
docker run -p 8081:80 --name tictactoe_api patrikbehramiswi/tictactoe_api:latest
```