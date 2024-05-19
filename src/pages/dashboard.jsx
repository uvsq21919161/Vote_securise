import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { SidebarContext } from "../components/Sidebarprovider";
import resultat from "../assets/icon/Res.png";
import group from "../assets/icon/group.png";
import recepisse from "../assets/icon/recepisse.png";
import urne from "../assets/icon/urne.png";
import bulletin2 from "../assets/icon/bulletin2.png";
import deco from "../assets/icon/deco.png";
import { DashboardContext } from "../../context/dashboardContext";
import CandidatsList from "../components/CandidatsList";
import AdminList from "../components/AdminList";
import Recepisse from "../components/recepisse";
import Urne from "../components/urne";
import axios from "axios";

function Tableau() {
  const [showNotif1, setshowNotif1] = useState(true);
  const [showNotif2, setshowNotif2] = useState(true);
  const [date, setDate] = useState("");

  const { showMembreBureau, setshowMembreBureau } =
    useContext(DashboardContext);
  const { showCandidats, setshowCandidats } = useContext(DashboardContext);
  const { showRecepisse, setshowRecepisse } = useContext(DashboardContext);
  const { showRes, setRes } = useContext(DashboardContext);
  const { showUrne, setshowUrne } = useContext(DashboardContext);

  const candidats = [
    { name: "Vote blanc", votes: 100 },
    { name: "Charbel TOUMA", votes: 150 },
    { name: "Maya SANTINI", votes: 70 },
    { name: "Thomas JOLY", votes: 10 },
    { name: "Thanushan PIRABAKARAN", votes: 50 },
  ];

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

  useEffect(() => {
    setshowCandidats(false);
    setshowRecepisse(false);
    setRes(false);
    setshowUrne(false);
    setshowMembreBureau(false);
    axios.post("/getTime", {}).then(({ data }) => {
      if (data.error) {
        console.log(data.error);
      }
      setDate(data.date)
    });
  }, []);

  // res
  const totalVotes = candidats.reduce(
    (total, candidat) => total + candidat.votes,
    0
  );

  // res
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

  //res
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
              {date}
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

      {showUrne && <Urne />}

      {showMembreBureau && <AdminList />}

      {showCandidats && <CandidatsList />}

      {showRecepisse && <Recepisse />}
    </div>
  );
}

export default Tableau;
