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
      <button
        onClick={() => {
          window.location.href = "http://localhost:5000/auth";
        }}
      >
        Enter App
      </button>
      <div className="no-account">
        <p>Don't have an iRacing Account?</p>
        <a className="see-app-work">
          Don't have an account? Click here to see how the app works!
        </a>
      </div>
    </>
  );
}

export default Home;
