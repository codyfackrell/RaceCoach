import "./css/App.css";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        {/* <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/log"} element={<Log />} /> */}
      </Routes>
    </>
  );
}

export default App;
