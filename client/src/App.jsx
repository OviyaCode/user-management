import { useState } from "react";
import "./App.css";
import { getToken } from "./services/userServices";
import Login from "./components/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./components/Register";
function App() {
  const [token, setToken] = useState(getToken());

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/home" /> : <Login setToken={setToken} />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/home" /> : <Register />}
          />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
