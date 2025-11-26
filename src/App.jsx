import "./css/App.css";
import Home from "./components/Home";
import Begin from "./components/Begin";
import Analyze from "./components/Analyze";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/begin"} element={<Begin />} />
        <Route path={"/analyze"} element={<Analyze />} />
        {/* <Route path={"/signup"} element={<Signup />} /> */}
        {/* <Route path={"/log"} element={<Log />} /> */}
      </Routes>
    </>
  );
}

export default App;
