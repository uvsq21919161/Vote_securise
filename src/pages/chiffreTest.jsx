import { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./style.css";
import { SidebarContext } from "../components/Sidebarprovider";
import { Button } from "antd";
import API from '../constants/Apis';

function ChiffreTest() {
  const {isSideBarExpanded, setIsSideBarExpanded} = useContext(SidebarContext);

  const handleClick = async() => {
    console.log("J'aime chiffrer des messages");
    let res = await fetch(`${API.APIuri}/api/init/init`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json' 
      }
    });
    let rec = await res.json();
    console.log(rec);
  }

  const styleSidebarexpanded = {
    marginLeft: isSideBarExpanded ? "275px" : "55px",
    transition: "margin-left 0.2s ease",
  };

  return (
    <>
    <div className="calque">
      <div className="container">
        <div className="page" style={styleSidebarexpanded}>
          <div className="entete">
            <Button onClick={() => {handleClick()}}>CHIFFRE TA MERE</Button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ChiffreTest;