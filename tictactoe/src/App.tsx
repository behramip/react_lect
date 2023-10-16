import { useState, useEffect } from 'react'
import './App.css'
import { urlBase } from './helpers/constHelper'
import { PlayerList } from './components/PlayerList'

const App : React.FC = () => <Game />

const MY_NAME = 'Patrik';

type SquareContent = 'o' | 'x' | '';

const Game : React.FC = () => {
  const [squares, setSquares] = useState<Array<SquareContent>>(Array.from({length: 9}, (_, __) => '')); 
  const [fetchResultState, setFetchResultState] = useState<string>('');
  const [isNextX, setIsNextX] = useState<boolean>(true);
  const [selectedPlayer, setSelectedPlayer] = useState<string>(MY_NAME);
  const [selectedPlayerBoards, setSelectedPlayerBoards] = useState<Array<string>>([]);

  useEffect(() => {
    const fetchLatestGame = async () => {
      const resp = await fetch(`${urlBase}getLatestByName/${MY_NAME}`);
      const result = await resp.json();
      
      setSquares(JSON.parse(result.boardBackupString));
    };

    fetchLatestGame();
  },[])

  const setSquare = (index:number) => {
    if (squares[index] !== ''){
      return;
    }
    setSquares((prevState) => {
      const content : SquareContent = isNextX ? 'x' : 'o';

      const prevStateArr : Array<SquareContent> 
        = [...prevState.slice(0, index),content, ...prevState.slice(index + 1)];

      return prevStateArr;
    });

    setIsNextX(prev => !prev);
  }

  const postSquares = () => {
    const squaresToSend = { 
      "OwnerName": selectedPlayer,
      "BoardBackupString": JSON.stringify(squares)
    }

    fetch(`${urlBase}save`, {
      body: JSON.stringify(squaresToSend),
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(resp => {
      if (resp.status === 201){
        setFetchResultState('Uspesne odeslano')
        setTimeout(() => {
          setFetchResultState('');
        }, 2000);
        return;
      }

      setFetchResultState('Nastala chyba pri odesilani');
      setTimeout(() => {
        setFetchResultState('');
      }, 2000);

      console.log('ERROR');
    })
  }

  const getAllPlayerGames = async () => {
  
      const resp = await fetch(`${urlBase}getBoardsStringGroupedByName`);
      const result = await resp.json();

      const selectedPlayerBoardsRes = result
        .filter((res:any) => res.name === selectedPlayer)[0].boards;
      console.log(selectedPlayerBoardsRes);
      setSelectedPlayerBoards(selectedPlayerBoardsRes)
  }

  const resetGame = () => {
    setSquares(Array.from({length: 9}, (_, __) => ''))
    setIsNextX(true);
  }

  return <>
    <PlayerList setSelectedPlayer={setSelectedPlayer} selectedPlayer={selectedPlayer} />
    <div style={{ position: 'fixed', top: 10, left: '45%' }}>{fetchResultState}</div>
    <div>
      <SquareLine squareLine={squares.slice(0, 3)} rowIndex={0} setSquare={setSquare} />
      <SquareLine squareLine={squares.slice(3, 6)} rowIndex={1} setSquare={setSquare} />
      <SquareLine squareLine={squares.slice(6, 9)} rowIndex={2} setSquare={setSquare} />
      <div>
        {/* <input onChange={ev => setSelectedPlayer(ev.target.value)} /> */}
        <button onClick={(_) => getAllPlayerGames()}>Nacist</button>
      </div>
      <div>
        <button onClick={() => postSquares()} style={{ backgroundColor: 'beige' }}>
          Poslat
        </button>
        <button style={{ backgroundColor: 'beige' }}
          onClick={() => resetGame()} >
          Vynulovat
        </button>
      </div>
      <>
      {selectedPlayerBoards.map(board => {
        return <div onClick={(_) => setSquares(JSON.parse(board))}>{board}</div>
      })}
      </>
    </div>
  </>
}

type SquareLineProps = {
  squareLine: Array<SquareContent>;
  rowIndex: number;
  setSquare: (index: number) => void;
}

const SquareLine: React.FC<SquareLineProps> = (props) => {
  const { squareLine, rowIndex, setSquare } = props;

  return <div>
    {squareLine.map((square, colIndex) => <Square setSquare={setSquare} content={square} index={rowIndex * 3 + colIndex} key={`square-line-${rowIndex * 3 + colIndex}`}/>)}
  </div>
}

type SquareProps = {
  content: SquareContent;
  index: number;
  setSquare: (index: number) => void;
}

const Square : React.FC<SquareProps> = ({content, index, setSquare}) => {
  return <span onClick={() => setSquare(index)} key={`square-${index}`}
  style={{display: 'inline-block',height: '30px', width: '30px', border: '1px solid black', fontSize: '20px'}}>
    {content}
  </span>
}

export default App
