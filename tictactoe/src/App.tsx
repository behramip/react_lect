import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => <Game />

type SquareContent = 'x' | 'o' | '';

const Game : React.FC = () => {
  const [squares, setSquares] = 
    useState<Array<SquareContent>>(Array.from({length: 9}, (_, __) => ''))
  const [currentContent, setCurrentContent] = useState<SquareContent>('x');

  const setSquare = (index: number) => {
    if (squares[index] !== ''){
      return;
    }
    setSquares((prevState) => {
      const content = currentContent;

      const toSet : Array<SquareContent> 
        = [...prevState.slice(0, index), content, ...prevState.slice(index + 1)]

      return toSet;
    })

    setCurrentContent(prevCont => prevCont === 'o' ? 'x' : 'o')
  }

  return <>
    <SquareLine squareLine={squares.slice(0, 3)} rowIndex={0} setSquare={setSquare} />
    <SquareLine squareLine={squares.slice(3, 6)} rowIndex={1} setSquare={setSquare} />
    <SquareLine squareLine={squares.slice(6, 9)} rowIndex={2} setSquare={setSquare} />
  </>
}

type SquareLineProps = {
  squareLine: Array<SquareContent>;
  rowIndex: number;
  setSquare: (index: number) => void
}

const SquareLine : React.FC<SquareLineProps> = ({squareLine, rowIndex, setSquare}) => {
  return <div>
    {squareLine.map((squareContent, index) => {
      return <Square content={squareContent} index={index + (rowIndex * 3)} setSquare={setSquare}  />
    })}
  </div>
}

type SquareProps = {
  content: SquareContent;
  index: number;
  setSquare: (index: number) => void
}

const Square : React.FC<SquareProps> = ({content, index, setSquare}) => {
  return <span style={{display: 'inline-block', height: '30px', 
            width: '30px', border: '1px solid black', fontSize: '20px'}}
            onClick={_ => setSquare(index)}
            >
        {content}
  </span>
}


export default App
