import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App : React.FC = () => <Game/>

type SquareContent = 'o' | 'x' | '';

const MY_NAME = 'Patrik';
const URL_BASE = 'http://brn-dvb-pbeh.swdev.local/';


const Game : React.FC = () => {
  const [squares, setSquares] = useState<Array<SquareContent>>(Array.from({length: 9}, (_, __) => ''));
  const [lastPlayedX, setLastPlayedX] = useState<boolean>(false);
  const [postState, setPostState] = useState<string>('')

  const setSingleSquare = (index: number) => {
    setSquares(prevSquares => {

      const contentToPlay : SquareContent = lastPlayedX ? 'o' : 'x';
      const stateToSet : Array<SquareContent> = 
        [...prevSquares.slice(0, index), contentToPlay, ...prevSquares.slice(index + 1)];


      return stateToSet;
    })
    setLastPlayedX(prevVal => !prevVal);
  }

  const postSquares = () => {
    const squaresToSend = {
      'OwnerName': MY_NAME,
      'BoardBackupString': JSON.stringify(squares),
    }

    fetch(`${URL_BASE}save`, {
      body: JSON.stringify(squaresToSend),
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(resp => {
      if (resp.status === 201){
        setPostState('Successfully sent')
        setTimeout(() => {
          setPostState('');
        }, 1000);
        return;
      }

      setPostState('Error!!')
        setTimeout(() => {
          setPostState('');
        }, 1000);
    })
  }  

  return <>
    <div style={{ position: 'fixed', top: 10, left: '45%' }}>{postState}</div>
    <SquareLine squareLine={squares.slice(0,3)} rowIndex={0} setSingleSquare={setSingleSquare} />
    <SquareLine squareLine={squares.slice(3,6)} rowIndex={1} setSingleSquare={setSingleSquare} />
    <SquareLine squareLine={squares.slice(6,9)} rowIndex={2} setSingleSquare={setSingleSquare} />
    <div>
      <button onClick={() => postSquares()}>Send game</button>
    </div>
  </>
}

type SquareLineProps = {
  squareLine: Array<SquareContent>;
  rowIndex: number; 
  setSingleSquare: (index: number) => void;
}

const SquareLine : React.FC<SquareLineProps> = ({rowIndex, squareLine, setSingleSquare}) => {

  return <div>
    {squareLine.map((square, index) => 
      <Square content={squareLine[index]} setSingleSquare={setSingleSquare} index={rowIndex * 3 + index} />)
      }
  </div>
}

type SquareProps = {
  content: SquareContent;
  setSingleSquare: (index: number) => void;
  index: number;
}

const Square : React.FC<SquareProps> = ({content, setSingleSquare, index}) => {

  return <span onClick={() => setSingleSquare(index)} style={{display:'inline-block', height: '40px', width: '40px', border: '1px solid black', fontSize: '30px'}}>
      {content}
  </span>
}



export default App
