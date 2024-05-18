import { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./style.css";
import { SidebarContext } from "../components/Sidebarprovider";
import { Button } from "antd";
import API from '../constants/Apis';
import React from "react";

function ChiffreTest() {
  const {isSideBarExpanded, setIsSideBarExpanded} = useContext(SidebarContext);

  console.log(API.APIuri);

  const [message, setMessage] = React.useState("");

  const [mail, setMail] = React.useState("");

  const [jour, setJour] = React.useState("");

  const [mois, setMois] = React.useState("");

  const [annee, setAnne] = React.useState("");

  const [heure, setHeure] = React.useState("");

  const [ci, setCi] = React.useState("");

  const [candidatFinalC, setCandidatFinalC] = React.useState("");

  const [candidat, setCandidat] = React.useState("");

  const [nomCandidat, setNomCandidat] = React.useState("");

  const [description, setDescription] = React.useState("");

  const [candidatRecherche, setCandidatRech] = React.useState("");

  const [indice, setIndice] = React.useState("")

  const handleInit = async() => {
    console.log("J'aime initialiser des processus de chiffrement");
    let res = await fetch(`${API.APIuri}/api/init/init`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        nb_serv: 3,
        candidats: 2,
        date_fin: new Date(annee, mois-1, jour, heure, 0,0)
      })
    });
    let rec = await res.json();
    console.log(rec);
  }

  const handleChiffrement = async() => {
    console.log("J'aime chiffrer des messages");
    let res = await fetch(`${API.APIuri}/api/chi/chiffre`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        message: message
      })
    });
    let rec = await res.json();
    if (rec !== "Vote terminé...") {
      for (let i = 0; i < rec.votes.length; i++) {
        let resvote = await fetch(`${API.APIuri}/api/vote/avoter`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json' 
          },
          body: JSON.stringify({
            uid: "21916099",
            vote: rec.votes[i],
            candidat: i
          })
        });
        let response = await resvote.json();
        if (response !== "Vote enregistré avec succès!") {
          console.log("Erreur pendant le chiffrement du vote pour le candidat :",i);
        }
      }
    }
  }

  const styleSidebarexpanded = {
    marginLeft: isSideBarExpanded ? "275px" : "55px",
    transition: "margin-left 0.2s ease",
  };

  const sendMail = async() => {
    console.log("j'aime envoyer des mails");
    let res = await fetch(`${API.APIuri}/api/mail/send`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        email: "thomasjoly04@gmail.com",
        sk: "oauaiaiaiaiaiaaiaiaiaiai"
      })
    });
  }

  const setLaDate = async() => {
    //Date(annee, mois-1, jour, heure, 7, 0);
    const d = new Date(annee, mois-1, jour, heure, 0,0);
    console.log(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours());
    
  }

  const addMail = async() => {
    let res = await fetch(`${API.APIuri}/api/admin/add`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        mail: mail
      })
    });
    console.log(res);
  }

  const showMails = async() => {
    let res = await fetch(`${API.APIuri}/api/admin/getall`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json' 
      }
    });
    const nice = await res.json();
    console.log(nice);
    console.log(nice.length);
  }

  const calcProd = async() => {
    let res = await fetch(`${API.APIuri}/api/produit/calc`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        candidat: candidatFinalC
      })
    });
  }

  const sendCi = async() => {
    let res = await fetch(`${API.APIuri}/api/ci/add`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        ci: ci,
        mail: "thomasjoly04@gmail.com",
        candidat: candidat,
        indice: indice
      })
    });
  }

  const addCandidat = async() => {
    let res = await fetch(`${API.APIuri}/api/candidat/add`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        nom: nomCandidat,
        description: description
      })
    });
  };

  const computeCandidati = async() => {
    let res = await fetch(`${API.APIuri}/api/ci/getcandidat`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        candidat: candidatRecherche
      })
    });
    const liste_ci = await res.json();
    console.log(liste_ci);
    let res2 = await fetch(`${API.APIuri}/api/combine/compute`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        candidat: candidatRecherche,
        ci: liste_ci
      })
    });
    const resultatI = await res2.json();
    let lastone = await fetch(`${API.APIuri}/api/candidat/update`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        idcandidat: candidatRecherche,
        resultat: resultatI
      })
    });

  }

  return (
    <>
    <div className="calque">
      <div className="container">
        <div className="page" style={styleSidebarexpanded}>
          <div className="entete">
            <input placeholder="Annee" onChange={e => {setAnne(e.target.value)}}></input>
            <input placeholder="Mois" onChange={e => {setMois(e.target.value)}}></input>
            <input placeholder= "Jour" onChange={e => {setJour(e.target.value)}}></input>
            <input placeholder="Heure" onChange={e => {setHeure(e.target.value)}}></input>
            <Button onClick={() => {handleInit()}}>TEST INIT</Button>
          </div>
          <input placeholder= "vote" onChange={e => {setMessage(e.target.value)}}></input>
          <button onClick={() => (handleChiffrement())}>CHIFFRE TEST</button>
          <button onClick={() => (sendMail())} style={{marginRight:"1500px"}}>SEND MAIL TEST</button>
          <input placeholder="mail" onChange={e => {setMail(e.target.value)}}></input>
          <button onClick={() => (addMail())} >AJOUTE MAIL TEST </button>
          <button onClick={() => (showMails())} style={{marginRight:"1500px"}} >SHOW MAILS </button>
          <input placeholder="Numero du candidat pour lequel calculer le produit" onChange={e => {setCandidatFinalC(e.target.value)}}></input>
          <button onClick={() => (calcProd())} style={{marginRight:"1500px"}} >CALC PROD </button>
          <input placeholder="ci" onChange={e => {setCi(e.target.value)}}></input>
          <input placeholder="candidat associé au ci" onChange={e => {setCandidat(e.target.value)}}></input>
          <input placeholder="indice" onChange={e => {setIndice(e.target.value)}}></input>
          <button onClick={() => (sendCi())} style={{marginRight:"1500px"}} >SEND CI </button>
          <input placeholder="Nom du candidat" onChange={e => {setNomCandidat(e.target.value)}}></input>
          <input placeholder="Description du candidat" onChange={e => {setDescription(e.target.value)}}></input>
          <button onClick={() => (addCandidat())} style={{marginRight:"1500px"}} > Ajouter le candidat </button>
          <input placeholder="Num du candidat recherché" onChange={e => {setCandidatRech(e.target.value)}}></input>
          <button onClick={() => (computeCandidati())} style={{marginRight:"1500px"}} > Rechercher les ci du candidat </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default ChiffreTest;