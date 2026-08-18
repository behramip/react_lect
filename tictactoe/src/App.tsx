import { useEffect, useState } from "react";
import "./App.css";
import { PlayerList } from "./components/PlayerList";
import { urlBase } from "./helpers/constHelper";

const App: React.FC = () => <Game />;

type SquareContent = "o" | "x" | "";

const MY_NAME = "Patrik";

const createEmptyBoard = (): SquareContent[] =>
  Array<SquareContent>(9).fill("");

type BoardGroup = {
  name: string;
  boards: string[];
};

const isBoardGroup = (group: unknown): group is BoardGroup => {
  if (typeof group !== "object" || group === null) {
    return false;
  }

  const { name, boards } = group as Record<string, unknown>;
  return (
    typeof name === "string" &&
    Array.isArray(boards) &&
    boards.every((board) => typeof board === "string")
  );
};

const parseBoard = (board: string): SquareContent[] | null => {
  try {
    const squares: unknown = JSON.parse(board);
    return Array.isArray(squares) &&
      squares.length === 9 &&
      squares.every(
        (square) => square === "x" || square === "o" || square === "",
      )
      ? squares
      : null;
  } catch {
    return null;
  }
};

const Game: React.FC = () => {
  const [squares, setSquares] = useState<SquareContent[]>(createEmptyBoard);
  const [lastPlayedX, setLastPlayedX] = useState<boolean>(false);
  const [postState, setPostState] = useState<string>("");
  const [selectedPlayer, setSelectedPlayer] = useState<string>(MY_NAME);
  const [selectedPlayerBoards, setSelectedPlayerBoards] = useState<string[]>(
    [],
  );

  useEffect(() => {
    fetch(`${urlBase}getLatestByName/${encodeURIComponent(MY_NAME)}`)
      .then((response) => response.json())
      .then((board: { boardBackupString?: string } | null) => {
        const latestBoard = board?.boardBackupString
          ? parseBoard(board.boardBackupString)
          : null;

        if (latestBoard) {
          setSquares(latestBoard);
        }
      })
      .catch(() => undefined);
  }, []);

  const setSingleSquare = (index: number) => {
    setSquares((prevSquares) => {
      const contentToPlay: SquareContent = lastPlayedX ? "o" : "x";
      const stateToSet: Array<SquareContent> = [
        ...prevSquares.slice(0, index),
        contentToPlay,
        ...prevSquares.slice(index + 1),
      ];

      return stateToSet;
    });
    setLastPlayedX((prevVal) => !prevVal);
  };

  const postSquares = () => {
    const squaresToSend = {
      OwnerName: selectedPlayer,
      BoardBackupString: JSON.stringify(squares),
    };

    fetch(`${urlBase}save`, {
      body: JSON.stringify(squaresToSend),
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      if (resp.status === 201) {
        setPostState("Successfully sent");
        setTimeout(() => {
          setPostState("");
        }, 1000);
        return;
      }

      setPostState("Error!!");
      setTimeout(() => {
        setPostState("");
      }, 1000);
    });
  };

  const getAllPlayerGames = () => {
    fetch(`${urlBase}getBoardsStringGroupedByName`)
      .then((response) => response.json())
      .then((groups: unknown) => {
        if (!Array.isArray(groups)) {
          setSelectedPlayerBoards([]);
          return;
        }

        const selectedGroup = groups.find(
          (group): group is BoardGroup =>
            isBoardGroup(group) && group.name === selectedPlayer,
        );
        setSelectedPlayerBoards(selectedGroup?.boards ?? []);
      })
      .catch(() => setSelectedPlayerBoards([]));
  };

  const resetGame = () => {
    setSquares(createEmptyBoard());
    setLastPlayedX(false);
  };

  return (
    <>
      <PlayerList
        selectedPlayer={selectedPlayer}
        setSelectedPlayer={setSelectedPlayer}
      />
      <div style={{ position: "fixed", top: 10, left: "45%" }}>{postState}</div>
      <SquareLine
        squareLine={squares.slice(0, 3)}
        rowIndex={0}
        setSingleSquare={setSingleSquare}
      />
      <SquareLine
        squareLine={squares.slice(3, 6)}
        rowIndex={1}
        setSingleSquare={setSingleSquare}
      />
      <SquareLine
        squareLine={squares.slice(6, 9)}
        rowIndex={2}
        setSingleSquare={setSingleSquare}
      />
      <div>
        <button onClick={getAllPlayerGames}>Load saved games</button>
        <button onClick={postSquares}>Send game</button>
        <button onClick={resetGame}>Reset game</button>
      </div>
      <div>
        {selectedPlayerBoards.map((board, index) => (
          <button
            key={`${selectedPlayer}-${index}`}
            onClick={() => {
              const savedBoard = parseBoard(board);
              if (savedBoard) {
                setSquares(savedBoard);
              }
            }}
          >
            {board}
          </button>
        ))}
      </div>
    </>
  );
};

type SquareLineProps = {
  squareLine: Array<SquareContent>;
  rowIndex: number;
  setSingleSquare: (index: number) => void;
};

const SquareLine: React.FC<SquareLineProps> = ({
  rowIndex,
  squareLine,
  setSingleSquare,
}) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {squareLine.map((content, index) => (
        <Square
          key={index}
          content={content}
          setSingleSquare={setSingleSquare}
          index={rowIndex * 3 + index}
        />
      ))}
    </div>
  );
};

type SquareProps = {
  content: SquareContent;
  setSingleSquare: (index: number) => void;
  index: number;
};

const Square: React.FC<SquareProps> = ({ content, setSingleSquare, index }) => {
  return (
    <span
      onClick={() => setSingleSquare(index)}
      style={{
        display: "flex",
        height: "40px",
        width: "40px",
        border: "1px solid black",
        fontSize: "30px",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {content}
    </span>
  );
};

export default App;
