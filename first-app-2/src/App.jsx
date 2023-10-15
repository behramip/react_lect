import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';

function App() {
  return <>
     <MyFirstComponent initialCount={1} textCol={'red'} moduloNumber={2} />
     <MyFirstComponent initialCount={5} textCol={'blue'} moduloNumber={5} />
     <MySecondComponent initialCount={2} textCol={'purple'} moduloNumber={3} />
     <MySecondComponent initialCount={2} textCol={'purple'} moduloNumber={3} />
  </>;
}

const MySecondComponent = ({initialCount, textCol, moduloNumber}) => {
  const [count, setCount] = useState(initialCount);

  const textColor = count % moduloNumber === 0 ? textCol : 'black'
  
  useEffect(() => {
    console.log('Mounted from stateless component')
  },[])

  useEffect(() => {
    console.log('Updated count from stateless component')
  },[count])

  return <div style={{fontSize: '28px', fontWeight: 'bold'}}>
      <span  style={{color: textColor}}>HELLO {count}</span>
      <button onClick={() => setCount(prevVal => prevVal + 1)}>Click me</button>
    </div>
}

class MyFirstComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      count: props.initialCount,
      textCol: props.textCol,
      moduloNumber: props.moduloNumber
    };
  }
  
  componentDidMount(){
    console.log('Mounted from class component')
  }

  componentDidUpdate(_, prevState){
    console.log('Update from class component', prevState, this.state)
  }

  render() {
    const textColor = this.state.count % this.state.moduloNumber === 0 ? this.state.textCol : 'black'
    return <div style={{fontSize: '28px', fontWeight: 'bold'}}>
      <span style={{color: textColor}}>HELLO {this.state.count}</span>
      <button onClick={() => this.setState({count: this.state.count + 1})}>Click me</button>
    </div>
  }
}

export default App
