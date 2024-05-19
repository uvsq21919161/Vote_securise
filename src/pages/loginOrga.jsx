import { useContext, useEffect, useState } from "react";
import "./style.css";
import { SidebarContext } from "../components/Sidebarprovider";
import API from '../constants/Apis';
import React from "react";
import { useNavigate } from "react-router-dom";

function LoginOrga() {
    const navigate = useNavigate();

    const {isSideBarExpanded, setIsSideBarExpanded} = useContext(SidebarContext);

    const [password, setPassword] = useState("");

    const styleSidebarexpanded = {
        marginLeft: isSideBarExpanded ? "275px" : "55px",
        transition: "margin-left 0.2s ease",
      };

    const connexion = async() => {
        console.log(password);
        let res = await fetch(`${API.APIuri}/api/orga/log`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
              password: password
            })
          });
        let read = await res.json();
        if (read === "Password valide") {
            navigate(`/organisateur`);
        }
    }

    return(
        <>
        <div className="calque">
            <div className="container">
                <div className="page" style={styleSidebarexpanded}>
                    <div className="entete">
                        <input placeholder="MOT DE PASSE" onChange={e => {setPassword(e.target.value)}}></input>
                        <button onClick={connexion}> CONNEXION </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default LoginOrga;