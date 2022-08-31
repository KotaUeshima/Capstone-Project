import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapLoadFile from "./mapStuff/MapLoadFile";
import NavBar from "./components/NavBar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import GetCurrentUser from "./components/GetCurrentUser";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <GetCurrentUser />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/map" element={<MapLoadFile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create_account" element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
