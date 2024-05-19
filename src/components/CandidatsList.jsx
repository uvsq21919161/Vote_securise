import React, { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../context/dashboardContext";
import group from "../assets/icon/group.png";
import axios from "axios";

function CandidatsList() {
  const { setshowCandidats } = useContext(DashboardContext);
  let listMembres = "";
  const [listeCandidats, setListeCandidats] = useState([]);

  useEffect(() => {
    axios.post("/getCandidats", {}).then(({ data }) => {
      if (data.error) {
        setErrorCode(data.error);
      }
      const list = data.candidats.map((candidat) => {
        return candidat.nom;
      })
      setListeCandidats(list)
      setListeCandidats(data.candidats);
      listMembres = listeCandidats.length > 9 ? "long-list" : "";
    });
  }, []);

  return (
    <div className="overlay">
      <div className="popup">
        <div class="headRes">
          <img src={group} alt="Icon Membre" />
          <p>Élection du représentant du groupe - Candidats</p>
          <div class="lineSep"></div>
        </div>
        <button class="FermerRes" onClick={() => setshowCandidats(false)}>
          Fermer
        </button>
        <div class="borderMembre">
          <div class="headMembre">
            <img src={group} alt="Icon Membre" />
            <p>Candidats:</p>
          </div>
          <ul className={`tableMembre ${listMembres}`}>
            {listeCandidats.map((person, index) => (
              <li key={index} className="border_bottom">
                <span className="nameCandidat">{person.nom}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CandidatsList;
