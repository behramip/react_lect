import { useEffect, useState } from "react";
import { urlBase } from "../helpers/constHelper";

type PlayerListProps = {
  selectedPlayer: string;
  setSelectedPlayer: (player: string) => void;
};

export const PlayerList: React.FC<PlayerListProps> = ({
  selectedPlayer,
  setSelectedPlayer,
}) => {
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${urlBase}getAllOwnerNames`)
      .then((response) => response.json())
      .then((result: unknown) => {
        if (
          Array.isArray(result) &&
          result.every((player) => typeof player === "string")
        ) {
          setPlayers(result);
        }
      })
      .catch(() => setPlayers([]));
  }, []);

  return (
    <div style={{ position: "fixed", top: 10, left: 10 }}>
      {players.map((player) => (
        <button
          key={player}
          onClick={() => setSelectedPlayer(player)}
          style={{
            backgroundColor: selectedPlayer === player ? "green" : "white",
          }}
        >
          {player}
        </button>
      ))}
    </div>
  );
};
