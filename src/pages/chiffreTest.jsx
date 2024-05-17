import { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./style.css";
import { SidebarContext } from "../components/Sidebarprovider";
import { Button } from "antd";
import API from '../constants/Apis';
import React from "react";

function ChiffreTest() {
  const {isSideBarExpanded, setIsSideBarExpanded} = useContext(SidebarContext);

  const [message, setMessage] = React.useState("");

  const handleInit = async() => {
    console.log("J'aime initialiser des processus de chiffrement");
    let res = await fetch(`${API.APIuri}/api/init/init`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        nb_serv: 3,
        candidats: 2
      })
    });
    let rec = await res.json();
    console.log(rec);
  }

  const handleChiffrement = async() => {
    console.log("J'aime chiffrer des messages");
    let res = await fetch(`${API.APIuri}/api/chi/chiffre`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        message: message
      })
    });
    let rec = await res.json();
    for (let i = 0; i < rec.votes.length; i++) {
      let resvote = await fetch(`${API.APIuri}/api/vote/avoter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          uid: "21916099",
          vote: rec.votes[i],
          candidat: i
        })
      });
      let response = await resvote.json();
      if (response !== "Vote enregistré avec succès!") {
        console.log("Erreur pendant le chiffrement du vote pour le candidat :",i);
      }
    }
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
            <Button onClick={() => {handleInit()}}>INITIALISE TA MERE</Button>
          </div>
          <input onChange={e => {setMessage(e.target.value)}}></input>
          <button onClick={() => (handleChiffrement())}>CHIFFRE TA MERE</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default ChiffreTest;