import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
      <MySecondComponent initialCount={3} textCol={'yellow'} moduloNum={3} />
      <MyFirstComponent initialCount={0} textCol={'red'} moduloNum={2} />
      <MyFirstComponent initialCount={2} textCol={'blue'} moduloNum={5} />
    </>
  )
}

const MySecondComponent = ({initialCount, textCol, moduloNum}) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    console.log('MOUNTED from stateless')
  },[])

  useEffect(() => {
    console.log('count changed', count)
  },[count])

  const col = count % moduloNum == 0 ? textCol : 'black';

  return <div>
      <span style={{color: col, fontWeight: 'bold'}}>AHOJ {count}</span>
      <button onClick={evt => setCount(prev => prev + 1)}>Klikni</button>
    </div>
}

class MyFirstComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      count: props.initialCount,
      textCol: props.textCol,
      moduloNum: props.moduloNum,
    }
  }

  componentDidMount(){
    console.log('MOUNTED');
  }

  componentDidUpdate(prevProps, prevState){
    console.log('UPDATED', prevProps, prevState, this.state);
  }

  render() {
    const col = this.state.count % this.state.moduloNum == 0 ? this.state.textCol : 'black';

    return <div>
      <span style={{color: col, fontWeight: 'bold'}}>AHOJ {this.state.count}</span>
      <button onClick={evt => this.setState({count: this.state.count + 1})}>Klikni</button>
    </div>
  }
}

export default App
