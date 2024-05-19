import { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./style.css";
import { SidebarContext } from "../components/Sidebarprovider";
import { useNavigate } from "react-router-dom";

function Visu6() {
  const navigate = useNavigate();
  const {isSideBarExpanded, setIsSideBarExpanded} = useContext(SidebarContext);

  const styleSidebarexpanded = {
    marginLeft: isSideBarExpanded ? "275px" : "55px",
    transition: "margin-left 0.2s ease",
  };
  
  const navigateNext = () => {
    navigate(`/visu/Visu7`);
  }

  const navigatePrec = () => {
    navigate(-1);
  }

  return (
    <>
    <div className="calque">
      <div className="container">
        <div className="page" style={styleSidebarexpanded}>
          <div className="entete">
            <h1 className="title">Visualisation des serveurs</h1>
          </div>
          <div className="schema">
            <img src="../src/assets/schema6.png"/>
          </div>
          <div className="positionLegende5">
            <div className="legende">
            Chaque serveur déchiffre les votes avec sa clé privée.
            </div>
          </div>
          <div className="buttonContainer">
            <div className="buttonElement1">
              <button className="button2" onClick={() => navigatePrec()}>Étape précédente</button>
            </div>
            <div className="buttonElement2">
              <button className="button2" onClick={() => navigateNext()}>Étape suivante</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Visu6;