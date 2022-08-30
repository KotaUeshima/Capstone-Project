import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapLoadFile from "./mapStuff/MapLoadFile";
import NavBar from "./components/NavBar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/map" element={<MapLoadFile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
