import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./style.css";

function Election() {
  const [candidatsList, setCandidatsList] = useState([]);
  const [msgBulletin, setMsgBulletin] = useState("Vous n’avez pas encore fait votre choix, veuillez sélectionner une candidature.");
  
  const getCandidats = () => {
    setCandidatsList(["MAGIZ", "MAISNN",'URSS']);
  }

  useEffect (() => { 
    getCandidats();
  },[]);

  return (
    <>
    <div className="calque">
      <div className="container">
        <Sidebar />
        <div className="page">
          <div className="entete">
            <h1 className="title">Élection du représentant du groupe</h1>
            <p className="headinfo">
              Veuillez cliquer sur une des candidatures pour pouvoir la
              sélectionner.
              <br />
              Une fois votre choix effectué, vous pouvez cliquer sur le bouton{" "}
              <strong>Étape suivante</strong> pour accéder à une page de
              confirmation.
            </p>
          </div>
          <div className="flexcontainer">
            <div className="candidats">
              {candidatsList && candidatsList.map((element, index) => (
                <div className="slot">
                  <div className = "candidat" key={index}>
                    <strong className="candidatname">{element}</strong>
                    </div>
                </div>
              ))}
              <div className="slot">
                  <div className = "candidat" key="999">
                    <strong className="candidatname">Vote blanc</strong>
                  </div>
                </div>
            </div>
            <div className="containerbulletin">
              <div className="bulletin">
                <h2 className="headerbulletin">Mon bulletin</h2>
                <p className="bodybulletin">{msgBulletin}</p>
                <button className="button">Étape suivante</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Election;
