// Imports
import "./App.css";
import { Routes, Route } from "react-router-dom";
import BarreNavigation from "./components/BarreNavigation";
import Home from "./pages/Home";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import axios from "axios";
import { UserContextProvider } from "../context/userContext";
import "./styles/authentication.css";

// Paramétrage pour l'envoi des requêtes
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <BarreNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tableau" element={<Tableau />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/visu" element={<Visualisation />} />
      </Routes>
    </UserContextProvider>
  );
}

// Export
export default App;
