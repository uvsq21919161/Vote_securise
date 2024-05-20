import React, { useContext, useEffect, useState, useRef } from "react";
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
import API from '../constants/Apis';
import { UserContext } from "../../context/usercontext";

function Tableau() {
  let firstDeploy = useRef(true);
  const [showRes, setRes] = useState(false);
  const [showNotif1, setshowNotif1] = useState(false);
  const [showNotif2, setshowNotif2] = useState(false);
  const [showNotif3, setshowNotif3] = useState(false);
  const [showUrne, setshowUrne] = useState(false);
  const [empreinte, setEmpreinte] = useState("");
  const [showResEmpreinte, setResEmpreinte] = useState(false);
  const [showMembreBureau, setshowMembreBureau] = useState(false);
  const [showCandidats, setshowCandidats] = useState(false);
  const [userEmpreinte, setUserEmpreinte] = useState("");
  const { user } = useContext(UserContext);
  
  //const membres = [
  //  { nom: "Théo FRATCZAK", role: "Détenteur d’un fragment de clé" },
  //  { nom: "Clémence DUMOULIN", role: "Détenteur d’un fragment de clé" },
  //  { nom: "Alexandre MIHET", role: "Détenteur d’un fragment de clé" },
  //  { nom: "Théo FRATCZAK", role: "Détenteur d’un fragment de clé" },
  //  { nom: "Clémence DUMOULIN", role: "Détenteur d’un fragment de clé" },
  //  { nom: "Alexandre MIHET", role: "Détenteur d’un fragment de clé" },
  //  { nom: "Théo FRATCZAK", role: "Détenteur d’un fragment de clé" },
  //  { nom: "Clémence DUMOULIN", role: "Détenteur d’un fragment de clé" },
  //  { nom: "Alexandre MIHET", role: "Détenteur d’un fragment de clé" },
  //  { nom: "Théo FRATCZAK", role: "Détenteur d’un fragment de clé" },
  //  { nom: "Clémence DUMOULIN", role: "Détenteur d’un fragment de clé" },
  //  { nom: "Alexandre MIHET", role: "Détenteur d’un fragment de clé" },
  //  { nom: "Théo FRATCZAK", role: "Détenteur d’un fragment de clé" },
  //  { nom: "Clémence DUMOULIN", role: "Détenteur d’un fragment de clé" },
  //  { nom: "Alexandre MIHET", role: "Détenteur d’un fragment de clé" },
  //  { nom: "Théo FRATCZAK", role: "Détenteur d’un fragment de clé" },
  //];

  const [showRecepisse, setshowRecepisse] = useState(false);
  const [showMailEnvoye, setshowMailEnvoye] = useState(false);
  const [candidats, setCandidats] = useState([]);
  const [listeCandidats, setListeCandidats] = useState([]);
  const [membres, setMembres] = useState([]);
  const [jour, setJour] = useState("");
  const [mois, setMois] = useState("");
  const [heure, setHeure] = useState("");
  const [minute, setMinute] = useState("");
  const [anne, setAnne] = useState("");
  const [voteFini, setVoteFini] = useState(false);
  const [empreinteFound, setEmpreinteFound] = useState(false);

  const listClass = membres.length > 9 ? "long-list" : ""; // Pour mettre une ligne de separation au dernier element d'une petite liste
  const listMembres = listeCandidats.length > 9 ? "long-list" : ""; // Pour mettre une ligne de separation au dernier element d'une petite liste

  useEffect(() => {
    async function fetchCandidatsAndMembers() {
      const cands = await fetch(`${API.APIuri}/api/candidat/getall`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json' 
        }
      });
      const allCands = await cands.json();
      let sumVotes = 0;
      for (let i = 0; i < allCands.length; i++) {
        sumVotes = sumVotes + allCands[i].resultat;
        setCandidats(prevItems => [...prevItems, {name: allCands[i].nom, votes: allCands[i].resultat}]);
        setListeCandidats(prevItems => [...prevItems, {name: allCands[i].nom, characteristic: allCands[i].description}])
      };
      const nbVotes = await fetch(`${API.APIuri}/api/vote/numberOfVotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json' 
        }
      });
      const nbVotesRes = await nbVotes.json();
      setCandidats(prevItems => [...prevItems, {name: "Votes blanc", votes: (nbVotesRes/allCands.length)-sumVotes}]);
      const membres = await fetch(`${API.APIuri}/api/admin/getall`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json' 
        }
      });
      const allAdmins = await membres.json();
      for (let i = 0; i < allAdmins.length; i++) {
        setMembres(prevItems => [...prevItems, {nom:allAdmins[i].prenom+" "+allAdmins[i].nom, role: "Détenteur d’un fragment de clé"}])
      };
    };
    if (firstDeploy.current) {
      firstDeploy.current = false;
      fetchCandidatsAndMembers();
    }
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
  
  const handleButtonClick = async(buttonId) => {
    //rajouter qu'il faut verifier que l'empreinte est bien dans l'urne

    if (buttonId === "VerifierEmpreinte") {
      setResEmpreinte(true);
      console.log(empreinte);
      let res = await fetch(`${API.APIuri}/api/vote/findByEmpreinte`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          empreinte: empreinte
        })
      });
      const resultat = await res.json();
      if (resultat === "Empreinte non valide.") {
        setEmpreinteFound(false);
      } else {
        setEmpreinteFound(true);
      }
    } else if (buttonId === "EnvoyerMail") {
      setshowMailEnvoye(true);
      if (userEmpreinte !== "0") {
        let res = await fetch(`${API.APIuri}/api/user/sendMail`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json' 
          },
          body: JSON.stringify({
            email: user.email,
            recepisse: userEmpreinte
          })
        });
        const readable = await res.json();
        console.log(readable);
      }
    }
  };

  useEffect(() => {
    async function fetchEndTime() {
      const pubkey = await fetch(`${API.APIuri}/api/init/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json' 
        }
      });
      const readable = await pubkey.json();
      const d = new Date();
      const fin = new Date(readable.date_fin);
      setVoteFini(fin < d.getTime());
      setshowNotif3(fin < d.getTime());
      let arg1 = fin.getDate();
      if (arg1 < 10) {
        arg1 = "0"+arg1.toString();
      }
      setJour(arg1);
      let arg2 = fin.getMonth()+1;
      if (arg2 < 10) {
        arg2 = "0"+arg2.toString();
      }
      setMois(arg2);
      setAnne(fin.getFullYear());
      let arg3 = fin.getHours();
      if (arg3 < 10) {
        arg3 = "0"+arg3.toString();
      }
      setHeure(arg3);
      let arg = fin.getMinutes();
      if (arg < 10) {
        arg = "0"+arg.toString();
      }
      setMinute(arg);
      
    };
    fetchEndTime();
  }, []);

  useEffect(() => {
    async function fetchRecepisse() {
      let res = await fetch(`${API.APIuri}/api/user/get`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          email: user.email
        })
      });
      const resultat = await res.json();
      if (resultat.recepisse !== "0") {
        setshowNotif1(true);
        setshowNotif2(true);
      }
      setUserEmpreinte(resultat.recepisse);
    };
    fetchRecepisse();
  }, []);

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
                Votre récépissé de vote a été envoyé à {user.email}.
              </p>
            </div>
          )}

          {showNotif2 && (
            <div className="notification Rect2">
              <button class="FermerRes" onClick={() => setshowNotif2(false)}>
                Fermer
              </button>
              <p className="Texte limited-width">
                Vous n’avez plus de vote à exprimer.
              </p>
            </div>
          )}

          {showNotif3 && (
            <div className="notification Rect3">
              <button class="FermerRes" onClick={() => setshowNotif3(false)}>
                Fermer
              </button>
              <p className="Texte limited-width">
                Le vote est terminé, vous pouvez dès maintenant consulter les résultats.
              </p>
            </div>
          )}
          <div className="BigRect">
            <img src={deco} className="Deco " alt="deco" />
            <p className="TexteBigRect">Élection du représentant du groupe</p>
            <p className="TexteTourUnique">Tour unique</p>
            <p className="TexteDate">
              {voteFini ? <p>Le vote a pris fin le {jour}/{mois}/{anne} à {heure}:{minute}.</p>
              : <p>Le vote se termine a {heure}:{minute} le {jour}/{mois}/{anne}.</p>}
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
                onClick={() => setFinVote(false)}
              >
                {userEmpreinte==="0" ? <p style={{color:"white"}}>Vous n'avez pas encore voté.</p>
                : <p style={{color:"white"}}>Votre bulletin a bien été enregistré.</p>}
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
                {voteFini ? 
                        <>
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
                          </>
                    : <p>Vous pourrez consulter les résultats quand le vote aura prit fin.</p>}

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
                  {empreinteFound ? <p className="TexteEmpreinte">
                    Cette empreinte correspond à une entrée dans la liste
                    d’émargement (et non pas à une empreinte de bulletin), 
                    votre vote a bien été enregistré.
                  </p>
                  : <p> L'empreinte que vous avez founie n'est pas valide et ne 
                    correspond à aucun vote dans la base de donnée.</p>}
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
                {userEmpreinte=="0" ? <p id="Empreinte">Vous n'avez pas voté.</p>
                : <p id="Empreinte" style={{fontSize:"8px"}}>{userEmpreinte}</p>}
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
                  {userEmpreinte!=="0" && <p className="TexteEmpreinte">
                    Votre récépissé de vote a été envoyé à votre adresse mail.
                  </p>}
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
