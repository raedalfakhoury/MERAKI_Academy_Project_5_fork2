import "./App.css";
import Home from "./components/Home/Home";
import { Routes, Route, Link } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import Rigester from "./components/Rigester";
import LoginPage from "./components/Login";
function App() {
  return (
    <div className="App">


      <Routes>
        <Route path="/users/Rigester" element={<Rigester/>} />
        <Route path="/users/login" element={<LoginPage/>} />

      </Routes>
      <h1>
      <Nav.Link style={{ margin: "8px" }} href="/users/Rigester">
      Rigester
      </Nav.Link></h1>
      <h1>
      <Nav.Link style={{ margin: "8px" }} href="/users/login">
      Login
      </Nav.Link></h1>
    </div>
  );
}

export default App;
