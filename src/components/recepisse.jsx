import React, { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../context/dashboardContext";
import recepisse from "../assets/icon/recepisse.png";
import axios from "axios";

function Recepisse() {
  const { setshowRecepisse } = useContext(DashboardContext);
  const [empreinte, setEmpreinte] = useState("");
  const [showMailEnvoye, setshowMailEnvoye] = useState(false);

  useEffect(() => {
    // recup l'empreinte
    // tu peux faire avec un fetch
    axios.post("/getCandidats", {}).then(({ data }) => {
      if (data.error) {
        setErrorCode(data.error);
        console.log(data.error);
      }
      console.log(data);
    });
  }, []);

  const handleButtonClick = (buttonId) => {
    //rajouter qu'il faut verifier que l'empreinte est bien dans l'urne
    if (buttonId === "EnvoyerMail") {
      setshowMailEnvoye(true);
      console.log("Mail envoyé");
    }
  };

  return (
    <div className="overlay">
      <div className="popup">
        <div class="headRes">
          <img src={recepisse} alt="Icon urne" />
          <p>Récépissé de vote</p>
          <div class="lineSep"></div>
          <button
            class="FermerRes"
            onClick={() => {
              setshowRecepisse(false);
              setshowMailEnvoye(false);
            }}
          >
            Fermer
          </button>
        </div>
        <div class="borderRes">
          <div class="recepisseTitre">
            <p>L’empreinte numérique de votre bulletin dans l’urne est: </p>
          </div>
          <div className="inputContainer">
            <label htmlFor="Empreinte">Empreinte</label>
            <p id="Empreinte">{empreinte}</p>
          </div>
          <button
            class="bouttonVerifier"
            id="EnvoyerMail"
            type="button"
            onClick={() => handleButtonClick("EnvoyerMail")}
          >
            Renvoyer par mail
          </button>
          {showMailEnvoye && (
            <div className="popupEmpreinte">
              <p className="TexteEmpreinte">
                Votre récépissé de vote a été envoyé à votre adresse mail.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Recepisse;
