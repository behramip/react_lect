import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => <Game />;

const MY_NAME = "Patrik";

const URL_BASE = "http://localhost:8080/";

type SquareContent = "o" | "x" | "";

const Game: React.FC = () => {
  const [squares, setSquares] = useState<Array<SquareContent>>(
    Array.from({ length: 9 }, (_, __) => "")
  );
  const [isNextX, setIsNextX] = useState<boolean>(true);

  const setSquare = (index: number) => {
    if (squares[index] !== "") {
      return;
    }

    setSquares((prevState) => {
      const newStateArr: Array<SquareContent> = [
        ...prevState.slice(0, index),
        isNextX ? "x" : "o",
        ...prevState.slice(index + 1),
      ];

      return newStateArr;
    });

    setIsNextX((prev) => !prev);
  };

  const postSquares = () => {
    const squaresToSend = {
      OwnerName: MY_NAME,
      BoardBackupString: JSON.stringify(squares),
    };

    fetch(`${URL_BASE}save`, {
      body: JSON.stringify(squaresToSend),
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      if (resp.status === 201) {
        console.log("success");
        return;
      }

      console.error("failure");
    });
  };

  return (
    <div>
      <SquareRow
        squareRow={squares.slice(0, 3)}
        setSquare={setSquare}
        rowIndex={0}
      />
      <SquareRow
        squareRow={squares.slice(3, 6)}
        setSquare={setSquare}
        rowIndex={1}
      />
      <SquareRow
        squareRow={squares.slice(6, 9)}
        setSquare={setSquare}
        rowIndex={2}
      />
      <button onClick={() => postSquares()}>Send</button>
    </div>
  );
};

type SquareRowProps = {
  squareRow: Array<SquareContent>;
  setSquare: (index: number) => void;
  rowIndex: number;
};

const SquareRow: React.FC<SquareRowProps> = ({
  squareRow: squareLine,
  setSquare,
  rowIndex,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {squareLine.map((squareContent, colIndex) => (
        <Square
          content={squareContent}
          setSquare={setSquare}
          index={rowIndex * 3 + colIndex}
        />
      ))}
    </div>
  );
};

type SquareProps = {
  content: SquareContent;
  setSquare: (index: number) => void;
  index: number;
};

const Square: React.FC<SquareProps> = ({ content, setSquare, index }) => {
  return (
    <span
      style={{
        display: "block",
        height: "30px",
        width: "30px",
        border: "1px solid black",
        fontSize: "20px",
      }}
      onClick={() => setSquare(index)}
    >
      {content}
    </span>
  );
};

export default App;
