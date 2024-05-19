import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { SidebarContext } from "../components/Sidebarprovider";
import resultat from "../assets/icon/Res.png";
import group from "../assets/icon/group.png";
import recepisse from "../assets/icon/recepisse.png";
import urne from "../assets/icon/urne.png";
import vote from "../assets/icon/Icon_vote.png";
import bulletin from "../assets/icon/bulletin.png";
import bulletin2 from "../assets/icon/bulletin2.png";
import deco from "../assets/icon/deco.png";

function Tableau() {
  const [showRes, setRes] = useState(false);
  const [showNotif1, setshowNotif1] = useState(true);
  const [showNotif2, setshowNotif2] = useState(true);
  const [showUrne, setshowUrne] = useState(false);
  const [empreinte, setEmpreinte] = useState("");
  const [showResEmpreinte, setResEmpreinte] = useState(false);
  const [showMembreBureau, setshowMembreBureau] = useState(false);
  const [showCandidats, setshowCandidats] = useState(false);
  const listeCandidats = [
    { name: "Charbel TOUMA", characteristic: "l’aigri" },
    { name: "Maya SANTINI ", characteristic: "l’adorable" },
    { name: "Thanushan PIRABAKARAN", characteristic: "le diablotin " },
    { name: "Thomas JOLY", characteristic: "il est là " },
    { name: "Personne 1", characteristic: "Caractéristique " },
    { name: "Personne 2", characteristic: "Caractéristique " },
    { name: "Personne 3", characteristic: "Caractéristique " },
    { name: "Personne 4", characteristic: "Caractéristique " },
    { name: "Personne 5", characteristic: "Caractéristique " },
    { name: "Personne 6", characteristic: "Caractéristique " },
    { name: "Personne 7", characteristic: "Caractéristique " },
    { name: "Personne 8", characteristic: "Caractéristique " },
    { name: "Personne 9", characteristic: "Caractéristique " },
    { name: "Personne 10", characteristic: "Caractéristique " },
  ];
  const membres = [
    { nom: "Théo FRATCZAK", role: "Détenteur d’un fragment de clé" },
    { nom: "Clémence DUMOULIN", role: "Détenteur d’un fragment de clé" },
    { nom: "Alexandre MIHET", role: "Détenteur d’un fragment de clé" },
    { nom: "Théo FRATCZAK", role: "Détenteur d’un fragment de clé" },
    { nom: "Clémence DUMOULIN", role: "Détenteur d’un fragment de clé" },
    { nom: "Alexandre MIHET", role: "Détenteur d’un fragment de clé" },
    { nom: "Théo FRATCZAK", role: "Détenteur d’un fragment de clé" },
    { nom: "Clémence DUMOULIN", role: "Détenteur d’un fragment de clé" },
    { nom: "Alexandre MIHET", role: "Détenteur d’un fragment de clé" },
    { nom: "Théo FRATCZAK", role: "Détenteur d’un fragment de clé" },
    { nom: "Clémence DUMOULIN", role: "Détenteur d’un fragment de clé" },
    { nom: "Alexandre MIHET", role: "Détenteur d’un fragment de clé" },
    { nom: "Théo FRATCZAK", role: "Détenteur d’un fragment de clé" },
    { nom: "Clémence DUMOULIN", role: "Détenteur d’un fragment de clé" },
    { nom: "Alexandre MIHET", role: "Détenteur d’un fragment de clé" },
    { nom: "Théo FRATCZAK", role: "Détenteur d’un fragment de clé" },
  ];
  const listClass = membres.length > 9 ? "long-list" : ""; // Pour mettre une ligne de separation au dernier element d'une petite liste
  const listMembres = listeCandidats.length > 9 ? "long-list" : ""; // Pour mettre une ligne de separation au dernier element d'une petite liste

  const [showRecepisse, setshowRecepisse] = useState(false);
  const [showMailEnvoye, setshowMailEnvoye] = useState(false);
  const candidats = [
    { name: "Vote blanc", votes: 100 },
    { name: "Charbel TOUMA", votes: 150 },
    { name: "Maya SANTINI", votes: 70 },
    { name: "Thomas JOLY", votes: 10 },
    { name: "Thanushan PIRABAKARAN", votes: 50 },
  ];

  useEffect(() => {

  }, []);

  const [FinVote, setFinVote] = useState(false);
  const { isSideBarExpanded, setIsSideBarExpanded } =
    useContext(SidebarContext);

  const { selectedMenu, setSelectedMenu } = useContext(SidebarContext);
  useEffect(() => {
    if (selectedMenu !== "Tableau") {
      setSelectedMenu("Tableau");
    }
  }, [selectedMenu]);
  const styleSidebarexpanded = {
    marginLeft: isSideBarExpanded ? "275px" : "55px",
    transition: "margin-left 0.2s ease",
  };

  const totalVotes = candidats.reduce(
    (total, candidat) => total + candidat.votes,
    0
  );

  const data = {
    labels: candidats.map((candidat) => candidat.name),
    datasets: [
      {
        label: "Pourcentage des Voix",
        data: candidats.map((candidat) =>
          ((candidat.votes / totalVotes) * 100).toFixed(2)
        ),
        backgroundColor: [
          "#A1B9E5",
          "#BBA1E5",
          "#ABE5A1",
          "#FFF6C8",
          "#FFC7EC",
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#E7E9ED",
          "#4D5360",
          "#C9CBFF",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#00093B",
          font: {
            size: 18,
            family: "Arial",
            style: "normal",
            weight: "bold",
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };
  
  const handleButtonClick = (buttonId) => {
    //rajouter qu'il faut verifier que l'empreinte est bien dans l'urne

    if (buttonId === "VerifierEmpreinte") {
      setResEmpreinte(true);
      console.log("empreinte recupérée");
      console.log(empreinte);
    } else if (buttonId === "EnvoyerMail") {
      setshowMailEnvoye(true);
      console.log("Mail envoyé");
    }
  };

  return (
    <div className="container">
      <div className="page" style={styleSidebarexpanded}>
        <header className="entete">
          <h1 className="title">Tableau de bord</h1>
          <p className="headinfo">
            Bienvenue dans votre espace de vote en ligne.
          </p>
        </header>
        <div className="flexcontainer" id="tableauContainer">
          {showNotif1 && (
            <div className="notification Rect1">
              {" "}
              {/* Notification 1 */}
              <button class="FermerRes" onClick={() => setshowNotif1(false)}>
                Fermer
              </button>
              <p className="Texte1_rect1 limited-width">
                Votre bulletin a bien été enregistré.
              </p>
              <p className="Texte2_rect1 limited-width">
                Votre récépissé de vote a été envoyé à monadressemail@gmail.com.
              </p>
            </div>
          )}

          {showNotif2 && (
            <div className="notification Rect2">
              <button class="FermerRes" onClick={() => setshowNotif2(false)}>
                Fermer
              </button>
              <p className="Texte limited-width">
                Vous n’avez plus de vote à exprimer, vous pouvez vous
                déconnecter.
              </p>
            </div>
          )}
          <div className="BigRect">
            <img src={deco} className="Deco " alt="deco" />
            <p className="TexteBigRect">Élection du représentant du groupe</p>
            <p className="TexteTourUnique">Tour unique</p>
            <p className="TexteDate">
              13 mai 2024, 08:00 {">"} 24 mai 2024, 17:00
            </p>
            <div class="line"></div>
            <div className="Features">
              <p
                className="TexteFeatures"
                onClick={() => setshowRecepisse(true)}
              >
                <img src={recepisse} alt="Icon 1" id="icon_vote" />
                Récépissé de vote
              </p>
              <p
                className="TexteFeatures"
                onClick={() => setshowCandidats(true)}
              >
                <img src={bulletin2} alt="Icon 3" id="icon_bulletin" />
                Afficher les candidatures
              </p>
              <p className="TexteFeatures" onClick={() => setshowUrne(true)}>
                <img src={urne} alt="Icon 2" />
                Visualiser l’urne
              </p>
              <p
                className="TexteFeatures"
                onClick={() => setshowMembreBureau(true)}
              >
                <img src={group} alt="Icon 4" />
                Voir les membres du bureau de vote
              </p>
            </div>
            <div className="buttonContainer">
              <button
                class="BouttonEnregister"
                type="button"
                onClick={() => setFinVote(true)}
              >
                Votre bulletin a bien été enregistré.
              </button>
              <button
                class="BouttonResultat"
                type="button"
                onClick={() => setRes(true)}
              >
                <img src={resultat} alt="Icon Res" />
                Résultats
              </button>
            </div>
          </div>
        </div>
      </div>

      {showRes && (
        <div className="overlay">
          <div className="popup">
            <div className="headRes">
              <img src={recepisse} alt="Icon Res" />
              <p>Résultats</p>
              <div className="lineSep"></div>
            </div>
            <button className="FermerRes" onClick={() => setRes(false)}>
              Fermer
            </button>
            <div className="contentRes">
              <div className="borderResultat">
                <div className="pie-chart-container">
                  <Pie data={data} options={options} />
                </div>

                <div className="tableauRes">
                  <table className="tableRes">
                    <thead>
                      <tr>
                        <th>Nom du Candidat</th>
                        <th>Nombre de Voix</th>
                        <th>Pourcentage des Voix</th>
                      </tr>
                    </thead>
                    <tbody>
                      {candidats.map((candidat) => (
                        <tr key={candidat.name}>
                          <td>{candidat.name}</td>
                          <td>{candidat.votes}</td>
                          <td>
                            {((candidat.votes / totalVotes) * 100).toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td>Total</td>
                        <td>{totalVotes}</td>
                        <td>100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {FinVote && (
        <div className="overlay">
          <div className="popup">
            <div className="headRes">
              <img src={recepisse} alt="Icon Res" />
              <p>Résultats</p>
              <div className="lineSep"></div>
            </div>
            <button className="FermerRes" onClick={() => setFinVote(false)}>
              Fermer
            </button>
            <div className="contentRes">
              <div className="borderResultat">
                <h1 className="voteEnCours">Vote en cours...</h1>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUrne && (
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
                    d’émargement (et non pas à une empreinte de bulletin), le
                    vote de PIRABAKARAN Thanushan a bien été enregistré le
                    12/03/2024 à 10h32.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showMembreBureau && (
        <div className="overlay">
          <div className="popup">
            <div class="headRes">
              <img src={group} alt="Icon Membre" />
              <p>
                Élection du représentant du groupe - Membres du bureau de vote
              </p>
            </div>
            <div className="lineDiv">
              <div class="lineSep" />
            </div>
            <button
              class="FermerRes"
              onClick={() => setshowMembreBureau(false)}
            >
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
                    <span className="nameStyle">{membre.nom}</span>
                    <span className="rightText">{membre.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {showCandidats && (
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
                    <span className="nameCandidat">{person.name + " :"}</span>
                    <span className="caracText">{person.characteristic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {showRecepisse && (
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
      )}
    </div>
  );
}

export default Tableau;
