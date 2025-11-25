import { useState } from "react";
// import reactLogo from '../assets/'
// import viteLogo from "./vite.svg";
import { Link } from "react-router-dom";
import "../css/App.css";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Racing Analysis Technology</h1>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <Link to="/begin" className="button">
        Enter App
      </Link>
      <p>Don't have an iRacing Account?</p>
      <a className="read-the-docs">Click here to see how the app works!</a>
    </>
  );
}

export default Home;
