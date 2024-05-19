import { useContext, useEffect, useState } from "react";
import "./style.css";
import { SidebarContext } from "../components/Sidebarprovider";
import API from '../constants/Apis';
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "antd";

function Admin() {
    const {isSideBarExpanded, setIsSideBarExpanded} = useContext(SidebarContext);

    const location = useLocation();

    const mail = location.state.mail;

    const styleSidebarexpanded = {
        marginLeft: isSideBarExpanded ? "275px" : "55px",
        transition: "margin-left 0.2s ease",
      };

    const [ci, setCi] = React.useState("");

    const [candidat, setCandidat] = React.useState("");

    const [numero, setNumero] = React.useState("");

    const handleSubmit = async() => {
        let res = await fetch(`${API.APIuri}/api/ci/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
              ci: ci,
              mail: mail,
              candidat: candidat,
              indice: numero
            })
          });
    }

    return (
        <>
        <div className="calque">
            <div className="container">
                <div className="page" style={styleSidebarexpanded}>
                    <div className="entete">
                        Bienvenue sur la page Admin. A parti d'ici, vous pourrez envoyez les résultats de la part de calcul qui vous a été attribuée.
                    </div>
                    <div style={{marginTop:"50px"}}>
                        Veuillez entrez le numéro qui vous a été attribué (précisé dans le mail) :
                        <input placeholder="Votre numéro" onChange={e => {setNumero(e.target.value)}}></input>
                    </div>
                    <div>
                        Veuillez entrer le numéro du candidat (de 0 à n-1) auquel correspond le ci que vous allez entrer :
                        <input placeholder="Numero du candidat" onChange={e => {setCandidat(e.target.value)}}></input>
                    </div>
                    <div>
                        Veuillez entre le ci que vous avez calculé :
                        <input placeholder="Votre ci" onChange={e => {setCi(e.target.value)}}></input>
                    </div>
                    <div>
                        <Button onClick={() => {handleSubmit()}} style={{marginBottom:"100px"}}>Envoyer le résultat</Button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Admin;