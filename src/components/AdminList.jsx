import React, { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../context/dashboardContext";
import group from "../assets/icon/group.png";
import axios from "axios";

function AdminList() {
  const { setshowMembreBureau } = useContext(DashboardContext);
  let listClass = "";
  const [membres, setMembres] = useState([]);
  useEffect(() => {
    axios.post("/getAdmin", {}).then(({ data }) => {
      if (data.error) {
        setErrorCode(data.error);
      }
      const {admins} = data
      setMembres(admins);
      const listClass = membres.length > 9 ? "long-list" : "";
    });
  }, []);

  return (
    <div className="overlay">
      <div className="popup">
        <div className="headRes">
          <img src={group} alt="Icon Membre" />
          <p>Élection du représentant du groupe - Membres du bureau de vote</p>
        </div>
        <div className="lineDiv">
          <div class="lineSep" />
        </div>
        <button class="FermerRes" onClick={() => setshowMembreBureau(false)}>
          Fermer
        </button>
        <div class="borderMembre">
          <div class="headMembre">
            <img src={group} alt="Icon Membre" />
            <p>Membres du bureau de vote :</p>
          </div>
          <ul className={`tableMembre ${listClass}`}>
            {membres.map((membre) => (
              <li className="border_bottom">
                <span className="nameStyle">{membre.prenom} {membre.nom}</span>
                <span className="rightText">
                  Détenteur d’un fragment de clé
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminList;
