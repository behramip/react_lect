FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS build

WORKDIR /app
COPY . .
RUN dotnet restore TicTacToeAPI.csproj
RUN dotnet publish TicTacToeAPI.csproj -o /app/published-app

FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS runtime
WORKDIR /app
COPY --from=build /app/published-app /app

ENTRYPOINT [ "dotnet", "/app/TicTacToeAPI.dll" ]

EXPOSE 8080
