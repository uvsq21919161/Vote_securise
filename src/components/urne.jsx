import React, { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../context/dashboardContext";
import urne from "../assets/icon/urne.png";
import vote from "../assets/icon/Icon_vote.png";
import axios from "axios";

function Urne() {
  const { setshowUrne } = useContext(DashboardContext);
  const [showResEmpreinte, setResEmpreinte] = useState(false);
  const [empreinte, setEmpreinte] = useState("");

  const handleButtonClick = (buttonId) => {
    //rajouter qu'il faut verifier que l'empreinte est bien dans l'urne
    if (buttonId === "VerifierEmpreinte") {
      setResEmpreinte(true);
      console.log("empreinte recupérée");
      console.log(empreinte);
    }
  };

  useEffect(() => {
    // remplacer par le fetch pour recup l'urne et comparé avec celui que l'utilisateur a donné 
    axios.post("/getCandidats", {}).then(({ data }) => {
      if (data.error) {
        setErrorCode(data.error);
        console.log(data.error);
      }
      console.log(data);
    });
  }, []);

  return (
    <div className="overlay">
      <div className="popup">
        <div class="headRes">
          <img src={urne} alt="Icon urne" />
          <p>Élection du représentant du groupe - Urne</p>
          <div class="lineSep"></div>
          <button
            class="FermerRes"
            onClick={() => {
              setshowUrne(false);
              setResEmpreinte(false);
            }}
          >
            Fermer
          </button>
        </div>
        <div class="borderRes">
          <div class="urneTitre">
            <img src={vote} alt="Icon vote" />
            <p>
              Vous pouvez vérifier qu’un bulletin est bien dans l’urne en
              indiquant l’empreinte:
            </p>
          </div>
          <div className="inputContainer">
            <label htmlFor="empreinte">Empreinte</label>
            <input
              type="text"
              id="empreinte"
              value={empreinte}
              onChange={(e) => setEmpreinte(e.target.value)}
              placeholder="a1315cc38bf7498ec24929cc38bf7f8=57024680b"
            />
          </div>
          <button
            class="bouttonVerifier"
            id="VerifierEmpreinte"
            type="button"
            onClick={() => handleButtonClick("VerifierEmpreinte")}
          >
            Vérifier la présence du bulletin
          </button>
          {showResEmpreinte && (
            <div className="popupEmpreinte">
              <p className="TexteEmpreinte">
                Élection du représentant du groupe - Tour unique :
                <br />
                Cette empreinte correspond à une entrée dans la liste
                d’émargement (et non pas à une empreinte de bulletin), votre
                vote a bien été enregistré.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Urne;
