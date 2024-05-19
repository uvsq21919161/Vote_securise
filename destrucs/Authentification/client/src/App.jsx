// Imports
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Tableau from "./pages/tableau";
import Vote from "./pages/vote";
import Guide from "./pages/guide";
import Visualisation from "./pages/visu";
import axios from "axios";
import { UserContextProvider } from "../context/userContext";

// Paramétrage pour l'envoi des requêtes
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
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
