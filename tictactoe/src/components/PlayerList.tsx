import { useEffect, useState } from 'react'
import { urlBase } from './helpers/constHelper';

type PlayerListProps = {
    selectedPlayer: string,
    setSelectedPlayer: React.Dispatch<React.SetStateAction<string>>;
}

export const PlayerList: React.FC<PlayerListProps> = ({setSelectedPlayer, selectedPlayer}) => {
    
    const [playerList, setPlayerList] = useState<Array<string>>([]);

    const fetchPlayers = async () => {
      const resp = await fetch(`${urlBase}getAllOwnerNames`);
      const result = await resp.json();

      setPlayerList(result);
    }
  
    useEffect(() => {
        fetchPlayers();
    }, []);


    return <div style={{position:'fixed', top: 10, left: 10}} >
        {playerList.map(playerName => <div style={{backgroundColor: selectedPlayer === playerName ? 'green' : 'white'}} onClick={() => setSelectedPlayer(playerName)}>{playerName}</div>)}
    </div>
}