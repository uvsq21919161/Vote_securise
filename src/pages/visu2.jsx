import { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./style.css";
import { SidebarContext } from "../components/Sidebarprovider";
import { useNavigate } from "react-router-dom";
import schema2 from "../assets/schema2.png";

function Visu2() {
  const navigate = useNavigate();

  const {isSideBarExpanded, setIsSideBarExpanded} = useContext(SidebarContext);

  const styleSidebarexpanded = {
    marginLeft: isSideBarExpanded ? "275px" : "55px",
    transition: "margin-left 0.2s ease",
  };

  const navigateNext = () => {
    navigate(`/visu/Visu3`);
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
            <img src={schema2}/>
          </div>
          <div className="positionLegende1">
            <div className="legende">
            Chaque client chiffre son vote à l’aide de la clé publique reçue.
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

export default Visu2;