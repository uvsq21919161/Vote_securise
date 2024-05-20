import { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./style.css";
import { SidebarContext } from "../components/Sidebarprovider";
import { useNavigate } from "react-router-dom";
import schema9 from "../assets/schema9.png";

function Visu9() {
  const navigate = useNavigate();
  const {isSideBarExpanded, setIsSideBarExpanded} = useContext(SidebarContext);

  const styleSidebarexpanded = {
    marginLeft: isSideBarExpanded ? "275px" : "55px",
    transition: "margin-left 0.2s ease",
  };

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
            <img src={schema9}/>
          </div>
          <div className="positionLegende8">
            <div className="legende">
            Le serveur central combine les résultats reçus afin d’obtenir le résultat final, qui sera alors affiché sur le site web et consultable par les électeurs.
            </div>
          </div>
          <div className="buttonContainer">
            <div className="buttonElement1">
              <button className="button2" onClick={() => navigatePrec()}>Étape précédente</button>
            </div>
            <div className="buttonElement2">
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Visu9;