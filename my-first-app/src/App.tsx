import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <MyFirstComponent initialCount={5} />
      {/* <MyFirstComponent initialCount={10} /> */}
    </>
  );
}

type MyFirstComponentProps = {
  initialCount: number;
};

const MyFirstComponent: React.FC<MyFirstComponentProps> = ({
  initialCount,
}) => {
  const [count, setCount] = useState<number>(initialCount);

  useEffect(() => {
    console.log("loaded");
  }, []);

  useEffect(() => {
    console.log("loaded-count");
  }, [count]);

  console.log("loaded?");

  return (
    <div>
      <div>{count}</div>
      <button onClick={(_) => setCount((prevVal) => prevVal + 1)}>
        Click me
      </button>
    </div>
  );
};

export default App;
