import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import Comott from "../assets/Comott.png";

function Sidebar() {
  const [isSideBarExpanded, setIsSideBarExpanded] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("Tableau de bord");

  const toggleSideBar = () => {
    setIsSideBarExpanded(!isSideBarExpanded);
  };

  const styleSidebar = {
    width: isSideBarExpanded ? "220px" : "50px",
    transition: "width 0.2s",
  };

  const handleMenuClick = (page) => {
    setSelectedMenu(page);
  };

  return (
    <div className="sidebarcontainer" style={styleSidebar}>
      <img className="logosidebar" src={Comott} />
      <button onClick={toggleSideBar}>
        <div>{"<"}</div>
      </button>
      <ul className="menu">
        <li className= {selectedMenu === "Tableau de bord" ? "menu-item selecteditem" : "menu-item"} onClick={() => handleMenuClick("Tableau de bord")}>
          <i className="icon">🏠</i>
          {isSideBarExpanded && <span className={selectedMenu === "Tableau de bord" ? "item selected" : "item"}>Tableau de bord</span>}
        </li>
        <li className= {selectedMenu === "Election" ? "menu-item selecteditem" : "menu-item"} onClick={() => handleMenuClick("Election")}>
          <i className="icon">🏠</i>
          {isSideBarExpanded && <span className={selectedMenu === "Election" ? "item selected" : "item"}>Election du représentant</span>}
        </li>
        <li className= {selectedMenu === "Guide" ? "menu-item selecteditem" : "menu-item"} onClick={() =>handleMenuClick("Guide")}>
          <i className="icon">🏠</i>
          {isSideBarExpanded && <span className={selectedMenu === "Guide" ? "item selected" : "item"}>Guide de l'électeur</span>}
        </li>
        <li className={selectedMenu === "Visualisation" ? "menu-item selecteditem" : "menu-item"} onClick={() => handleMenuClick("Visualisation")}>
          <i className="icon">🏠</i>
          {isSideBarExpanded && <span className={selectedMenu === "Visualisation" ? "item selected" : "item"}>Visualisation des serveurs</span>}
        </li>
        <li className={selectedMenu === "Déconnexion" ? "menu-item selecteditem" : "menu-item"} onClick={() => handleMenuClick("Déconnexion")}>
          <i className="icon">🏠</i>
          {isSideBarExpanded && <span className={selectedMenu === "Déconnexion" ? "item selected" : "item"}>Déconnexion</span>}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
