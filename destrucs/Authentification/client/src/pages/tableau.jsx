// A remplacer avec un menu
// Imports
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Fonction Dashboard qui sera modifiée pour devenir un menu
function Dashboard() {
  const navigate = useNavigate();

  /**
   *  Fonction asynchrone qui envoie une requête pour la déconnexion.
   */
  const disconnect = async () => {
    await axios.post("/disconnect");
    navigate("/");
  };

  // CSS
  const style = {
    flexDirection: "column",
  };

  // Rendu
  return (
    <div class="container" style={style}>
      <h1 className="text-center">Welcome to the Dashboard</h1>
      <p class="text-center">
        <a href="#" class="logout" onClick={disconnect}>
          Log Out
        </a>
      </p>
    </div>
  );
}

// Export
export default Dashboard;
