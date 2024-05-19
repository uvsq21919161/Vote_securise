import React, { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../context/dashboardContext";
import recepisse from "../assets/icon/recepisse.png";
import axios from "axios";

function Resultat() {
  const { setRes } = useContext(DashboardContext);
  const candidats = [
    { name: "Vote blanc", votes: 100 },
    { name: "Charbel TOUMA", votes: 150 },
    { name: "Maya SANTINI", votes: 70 },
    { name: "Thomas JOLY", votes: 10 },
    { name: "Thanushan PIRABAKARAN", votes: 50 },
  ];

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

  const totalVotes = candidats.reduce(
    (total, candidat) => total + candidat.votes,
    0
  );

  useEffect(() => {
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
  );
}

export default Resultat;
