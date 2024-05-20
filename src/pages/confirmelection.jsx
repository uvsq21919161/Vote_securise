import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { SidebarContext } from "../components/Sidebarprovider";
import bulletin from "../assets/icon/bulletin.png";
import urne from "../assets/icon/Icon_vote.png";
import { UserContext } from "../../context/usercontext";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function ConfirmElection() {
  const navigate = useNavigate();
  const { selectCandidat, selectCandidatName } = useContext(UserContext);
  const [msgBulletin, setMsgBulletin] = useState(selectCandidatName);
  const [empreinte, setEmpreinte] = useState("FAUT MODIFIER");
  const { isSideBarExpanded, setIsSideBarExpanded } =
    useContext(SidebarContext);
  const { user } = useContext(UserContext);

  const styleSidebarexpanded = {
    marginLeft: isSideBarExpanded ? "275px" : "55px",
    transition: "margin-left 0.2s ease",
  };

  const submitVote = async() => {
    //index du candidat selectionné
    console.log(selectCandidat);
    let res = await fetch(`${API.APIuri}/api/chi/chiffre`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        message: selectCandidat,
        email: user.email
      })
    });
    let rec = await res.json();
    console.log(rec);
    if (rec !== "Vote terminé ou vous avez déja voté...") {
      //let test = parseInt(user.numero);
      //console.log(typeof user.numero, user.numero);
      const hash = bcrypt.hashSync(user.numero.toString(), 10);
      let lastone = await fetch(`${API.APIuri}/api/user/updateRecepisse`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          email: user.email,
          recepisse: hash
        })
      });
      let resultat = await lastone.json();
      console.log("res du update recipisse :",resultat);
      console.log("envoie du recepisse par mail...");
      let mail = await fetch(`${API.APIuri}/api/user/sendMail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          email: user.email,
          recepisse: hash
        })
      });
      const mailres = await mail.json();
      console.log(mailres);
      for (let i = 0; i < rec.votes.length; i++) {
        let resvote = await fetch(`${API.APIuri}/api/vote/avoter`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json' 
          },
          body: JSON.stringify({
            empreinte: hash,
            vote: rec.votes[i],
            candidat: i
          })
        });
        let response = await resvote.json();
        if (response !== "Vote enregistré avec succès!") {
          console.log("Erreur pendant le chiffrement du vote pour le candidat :",i);
        }
      }
      navigate("/tableau");
    } else {
      console.log("Vous avez soit déja voté, soit le vote est terminé, soit il y a eu une erreur pendant le processus de chiffrement de votre vote.")
    }
  };

  return (
    <React.Fragment>
      <div className="calque">
        <div className="container">
          <div className="page" style={styleSidebarexpanded}>
            <div className="entete">
              <h1 className="title">Élection du représentant du groupe</h1>
              <p className="headinfo">
                Veuillez vérifier votre bulletin.
                <br />
                S’il représente bien ce que vous souhaitez voter, cliquez sur le
                bouton
                <strong>Envoyer définitivement votre bulletin</strong> pour que
                votre bulletin soit envoyer dans l’urne.
                <br />
                S’il ne représente pas ce que vous souhaitez voter, vous pouvez
                revenir sur le choix des propositions.
              </p>
            </div>
            <React.Fragment>
              <div className="flexcontainer">
                <div className="containerbulletinConfirm">
                  <div className="bulletin" id="confirm">
                    <div className="headerbulletin">
                      <img className="bulletinIcon" src={bulletin} />
                      <h2 className="headerbulletintext">Mon bulletin</h2>
                    </div>

                    <p className="bodybulletin">{msgBulletin}</p>
                    <button
                      className="button"
                      id="confirmButton"
                      onClick={() => navigate("/election")}
                    >
                      Revenir sur le choix des propositions.
                    </button>
                  </div>
                </div>
                <div className="containerbulletinConfirm">
                  <div className="bulletin" id="confirm">
                    <div className="headerbulletin">
                      <img className="voteIcon" src={urne} />
                      <h2 className="headerbulletintext">
                        Étape d’envoi définitif
                      </h2>
                    </div>
                    <p className="bodybulletin">{msgBulletin}</p>
                    <button
                      className="button"
                      id="confirmButton"
                      onClick={submitVote}
                    >
                      Étape suivante
                    </button>
                    <p className="bodyConfirm">
                      Votre bulletin a été chiffré et est prêt à être envoyé.
                      <br />
                      Contenu de l’enveloppe à inserer dans l’urne:
                    </p>
                    <p className="empreintText">
                      Un bulletin dont l’empreinte numérique est: <br />
                      {empreinte}
                    </p>
                    <p className="bodyConfirm" style={{paddingBottom: "0px", paddingTop: "0px"}}>
                    Cette empreinte pourra être utilisée pour suivre votre bulletin dans l’urne.
                    <br />
                    Elle ne sera réaffiché qu’une seule fois apràs l’envoi de votre bulletin.
                    </p>
                  </div>
                </div>
              </div>
            </React.Fragment>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ConfirmElection;
