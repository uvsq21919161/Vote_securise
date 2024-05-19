import { useContext, useEffect, useState } from "react";
import "./style.css";
import { SidebarContext } from "../components/Sidebarprovider";
import API from '../constants/Apis';
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
//mdp = lesboss
function Organisateur() {

    const navigate = useNavigate();

    const {isSideBarExpanded, setIsSideBarExpanded} = useContext(SidebarContext);

    const [jour, setJour] = React.useState("");

    const [mois, setMois] = React.useState("");
  
    const [annee, setAnne] = React.useState("");
  
    const [heure, setHeure] = React.useState("");

    const [nb_serv, setNb_serv] = React.useState("");

    const [nbCandidats, setNbCandidats] = React.useState("");

    const [nomCandidat, setNomCandidat] = React.useState("");

    const [descriptionCand, setDescriptionCand] = React.useState("");

    const [password, setPassword] = React.useState("");

    const [mail, setMail] = React.useState("");

    const [nom, setNom] = React.useState("");

    const [prenom, setPrenom] = React.useState("");

    const styleSidebarexpanded = {
        marginLeft: isSideBarExpanded ? "275px" : "55px",
        transition: "margin-left 0.2s ease",
      };

    const handleInit = async() => {
        let res = await fetch(`${API.APIuri}/api/init/init`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
              nb_serv: nb_serv,
              candidats: nbCandidats,
              date_fin: new Date(annee, mois-1, jour, heure, 0,0)
            })
          });
    };

    const handleAddCand = async() => {
        let res = await fetch(`${API.APIuri}/api/candidat/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
              nom: nomCandidat,
              description: descriptionCand
            })
          });
    }

    const handleAddAdmin = async() => {
        let res = await fetch(`${API.APIuri}/api/admin/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
              mail: mail,
              password: password,
              nom: nom,
              prenom: prenom
            })
          });  
    }

    const calcFinalC = async() => {
        let pub = await fetch(`${API.APIuri}/api/init/get`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json' 
            }
          });
        let readable = await pub.json();
        for (let i = 0; i < readable.candidats; i++){
            let res = await fetch(`${API.APIuri}/api/produit/calc`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                  candidat: i
                })
              });
        } 
    };

    const calcFinalResults = async() => {
        let pub = await fetch(`${API.APIuri}/api/init/get`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json' 
            }
          });
        let readable = await pub.json();

        for (let i = 0; i < readable.candidats; i++){
            let res = await fetch(`${API.APIuri}/api/ci/getcandidat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                  candidat: i
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
                  candidat: i,
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
                  idcandidat: i,
                  resultat: resultatI
                })
              });
        }
    }

    return (
        <>
        <div className="calque">
            <div className="container">
                <div className="page" style={styleSidebarexpanded}>
                    <div className="entete">
                        Choix des param du vote:
                        <div>
                            <input placeholder="Annee" onChange={e => {setAnne(e.target.value)}}></input>
                        </div>
                        <div>
                            <input placeholder="Mois" onChange={e => {setMois(e.target.value)}}></input>
                        </div>
                        <div>
                            <input placeholder= "Jour" onChange={e => {setJour(e.target.value)}}></input>
                        </div>
                        <div>
                            <input placeholder="Heure" onChange={e => {setHeure(e.target.value)}}></input>
                        </div>
                        <div>
                            <input placeholder="Nombre de serv" onChange={e => {setNb_serv(e.target.value)}}></input>
                        </div>
                        <div>
                            <input placeholder="Nombre de candidats" onChange={e => {setNbCandidats(e.target.value)}}></input>
                            <Button onClick={() => {handleInit()}}
                                style={{marginBottom:"100px"}}>INITIALISATION DU VOTE</Button>
                        </div>
                    </div>
                    Ajout d'un candidat (ajoutez exactement le nombre de candidats que vous avez définit plus haut pas plus pas moins) :
                    <div>
                        <input placeholder="Nom du candidat" onChange={e => {setNomCandidat(e.target.value)}}></input>
                    </div>
                    <div>
                        <input placeholder="Description du candidat" onChange={e => {setDescriptionCand(e.target.value)}}></input>
                        <Button onClick={() => {handleAddCand()}} style={{marginBottom:"100px"}}>Ajouter le candidat</Button>
                    </div>
                    <div>
                        Ajout d'un admin :
                    </div>
                    <div>
                        <input placeholder="Mail de l'admin" onChange={e => {setMail(e.target.value)}}></input>
                    </div>
                    <div>
                        <input placeholder="Nom de l'admin" onChange={e => {setNom(e.target.value)}}></input>
                    </div>
                    <div>
                        <input placeholder="Prénom de l'admin" onChange={e => {setPrenom(e.target.value)}}></input>
                    </div>
                    <div>
                        <input placeholder="Mdp de l'admin" onChange={e => {setPassword(e.target.value)}}></input>
                        <Button onClick={() => {handleAddAdmin()}} style={{marginBottom:"100px"}}>Ajouter l'admin</Button>
                    </div>
                    <div>
                        Calculer le produit des chiffrés :
                    </div>
                    <div>
                        <Button onClick={() => {calcFinalC()}} style={{marginBottom:"100px"}}>Calculer les C finaux</Button>
                    </div>
                    <div>
                        Calculer les résultats du vote :
                    </div>
                    <div>
                        <Button onClick={() => {calcFinalResults()}} style={{marginBottom:"100px"}}>Calculer les résultats du vote</Button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Organisateur;