import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
      <MyFirstComponent initialCount={2} />
      <MySecondComponent initialCount={5} />
      <MySecondComponent initialCount={11} />
    </>
  )
}

const MySecondComponent = ({initialCount}) => {
  const [count, setCount] = useState(initialCount);

  return <div style={{marginTop: '30px'}}>
    <div>AHOJJ {count}</div>
    <button onClick={_ => setCount(prev => prev + 1)}>Click</button>
  </div>
}

class MyFirstComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      count: props.initialCount,
    }
  }

  render() {
    return <div>
      <div>AHOJJ {this.state.count}</div>
      <button onClick={_ => this.setState({count: this.state.count+1})}>Click</button>
    </div>
  }
}

export default App
