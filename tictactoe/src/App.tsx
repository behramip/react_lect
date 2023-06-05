import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App : React.FC = () => <Game />

const urlBase = 'http://10.140.66.162/'

const MY_NAME = 'Patrik';

type SquareContent = 'o' | 'x' | '';

const Game : React.FC = () => {
  const [squares, setSquares] = useState<Array<SquareContent>>(Array.from({length: 9}, (_, __) => '')); 
  const [isNextX, setIsNextX] = useState<boolean>(true);

  const setSquare = (index:number) => {
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
      "OwnerName": MY_NAME,
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
        console.log('DONE')
        return;
      }

      console.log('ERROR');
    })
  }

  return <div>
    <SquareLine squareLine={squares.slice(0, 3)} rowIndex={0} setSquare={setSquare}/>
    <SquareLine squareLine={squares.slice(3, 6)} rowIndex={1} setSquare={setSquare}/>
    <SquareLine squareLine={squares.slice(6, 9)} rowIndex={2} setSquare={setSquare}/>
    <button onClick={() => postSquares()}>
      Poslat 
    </button>
  </div>
}

type SquareLineProps = {
  squareLine: Array<SquareContent>;
  rowIndex: number;
  setSquare: (index: number) => void;
}

const SquareLine: React.FC<SquareLineProps> = (props) => {
  const { squareLine, rowIndex, setSquare } = props;

  return <div>
    {squareLine.map((square, colIndex) => <Square setSquare={setSquare} content={square} index={rowIndex * 3 + colIndex} />)}
  </div>
}

type SquareProps = {
  content: SquareContent;
  index: number;
  setSquare: (index: number) => void;
}

const Square : React.FC<SquareProps> = ({content, index, setSquare}) => {
  return <span onClick={() => setSquare(index)}
  style={{display: 'inline-block',height: '30px', width: '30px', border: '1px solid black', fontSize: '20px'}}>
    {content}
  </span>
}

export default App
