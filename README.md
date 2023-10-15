###### Not a Czech speaker? Check out [English readme](./README-EN.md)

# ReactJS - školení

### Obsah
  - first-app - první React appka, představení jednoduchých principů
  - tictactoe - piškvorky React appka - s řešením všech úkolů
  - tictactoeAPI - API k piškvorkám - .NET projekt
  - index.js - vysvětlení základních principů ES6

### Úkoly 
1. Promazání stavu - tzn. všechna pole prázdná
2. Načíst seznam všech hráčů a zobrazit ho 
3. Po obnovení stránky načtení poslední uložené hry pod svým jménem
4. Možnost zadání jména do pole a po zmáčknutí tlačítka načtení všech uložených her pod daným jménem
5. Po kliknutí na konkrétní uloženou hru se tato hra načte do hracího pole
6. Místo zadávání jména do pole se uložené hry hráče zobrazí po kliknutí na jeho jméno vlevo nahoře (s vizuální nápovědou, který hráč je zvolen)
7. Pod jménem aktuálně vybraného hráče se odesílají hry na uložení

### Dostupné API endpointy

Základ adresy: http://192.168.6.25:1230

**GET:**

- /get - všechny boardy
- /getLatestByName/Patrik - poslední hra dle jména
- /getBoardsStringGroupedByName - pole objektů - jméno hráče a pole boardů
- /getAllOwnerNames - pole - jména všech hráčů, která mají uložené hry


**POST:**

- /save - ulož aktuální hru

Příklad zprávy:
```
{
  "OwnerName":"Patrik",
  "BoardBackupString":"[\"x\",\"x\",\"o\",\"o\",\"o\",\"x\",\"x\",\"\",\"\"]"
}
```

