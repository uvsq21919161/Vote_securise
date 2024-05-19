import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { SidebarContext } from "../components/Sidebarprovider";
import unfold from "../assets/icon/unfold.png";
import { UserContext } from "../../context/usercontext";
import axios from "axios";

function Election() {
  const [candidatsList, setCandidatsList] = useState([]);
  const [foldContent, setfoldContent] = useState(999);
  const [selectCandidat, setSelectCandidat] = useState(999);
  const [msgBulletin, setMsgBulletin] = useState(
    "Vous n’avez pas encore fait votre choix, veuillez sélectionner une candidature."
  );
  const { isSideBarExpanded, setIsSideBarExpanded } =
    useContext(SidebarContext);

  const { selectedMenu, setSelectedMenu } = useContext(SidebarContext);
  const { user } = useContext(UserContext);

  const styleSidebarexpanded = {
    marginLeft: isSideBarExpanded ? "275px" : "55px",
    transition: "margin-left 0.2s ease",
  };
  const getCandidats = () => {
    setCandidatsList([
      "Charbel TOUMA",
      "Maya SANTINI",
      "Thanushan PIRABAKARAN",
      "Thomas JOLY",
    ]);
    axios.post("/getCandidats", {}).then(({ data }) => {
      if (data.error) {
        setErrorCode(data.error);
        console.log(data.error);
      }
      setCandidatsList(data.candidats);
    });
  };

  useEffect(() => {
    getCandidats();
  }, []);

  useEffect(() => {
    if (selectedMenu !== "Election") {
      setSelectedMenu("Election");
    }
  }, [selectedMenu]);
  
  const handleFold = (e, element) => {
    if (e.target.dataset.index != foldContent) {
      setfoldContent(parseInt(e.target.dataset.index));
    } else {
      setfoldContent(999);
    }
  };
  
  const handleSelected = (element) => {
    setMsgBulletin(element.nom);
    if (element.id_candidat != selectCandidat) {
      setSelectCandidat(parseInt(element.id_candidat));
    } else {
      setSelectCandidat(999);
    }
  };
  
  const submitVote = () => {
    // appeler le truc de chiffré je vous mets les variables utiles
    
    // contient numéro étudiant (un int) et email: {numero: 21919161, email: 'email'}
    console.log(user)

    // index du candidat selectionné
    console.log(selectCandidat);
    console.log("vote envoyé");
  };
  
  return (
    <React.Fragment>
    <div className="calque">
        <div className="container">
          <div className="page" style={styleSidebarexpanded}>
            <div className="entete">
              <h1 className="title">Élection du représentant du groupe</h1>
              <p className="headinfo">
                Veuillez cliquer sur une des candidatures pour pouvoir la
                sélectionner.
                <br />
                Une fois votre choix effectué, vous pouvez cliquer sur le bouton{" "}
                <strong>Étape suivante</strong> pour accéder à une page de
                confirmation.
              </p>
            </div>
            {candidatsList.length > 0 ? <React.Fragment>
              <div className="flexcontainer">
                <div className="candidats">
                {candidatsList &&
                  candidatsList.map((element, index) => (
                    <div className="slot" key={index}>
                      <div
                        className="candidat"
                        key={index}
                        style={
                          foldContent === index
                            ? { borderRadius: "20px 20px 0px 0px" , padding: '40px 30px 0px 30px' }
                            : {}
                        }
                      >
                        <strong className="candidatname">{element.nom}</strong>
                        <img
                          className="unfold_icon"
                          src={unfold}
                          data-index={element.id_candidat}
                          onClick={(e) => handleFold(e, element)}
                        />
                      </div>
                      {foldContent === index && (
                        <div className="expand">{element.description}
                          <button className="selectCandidat" onClick={() => handleSelected(element)}>
                            <div className="cercle" id= {selectCandidat === index ? "blue" : "white"} />
                            Sélectionner cette candidature
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                <div className="slot">
                  <div
                    className="candidat"
                    key="999"
                    onClick={() => {
                      setMsgBulletin("Vote blanc");
                    }}
                  >
                    <strong className="candidatname">Vote blanc</strong>
                  </div>
                </div>
              </div>
              <div className="containerbulletin">
                <div className="bulletin">
                  <div className="headerbulletin">
                    <div className="imagebulletin" />
                    <h2 className="headerbulletintext">Mon bulletin</h2>
                  </div>

                  <p className="bodybulletin">{msgBulletin}</p>
                  <button className="button" onClick={submitVote}>
                    Étape suivante
                  </button>
                </div>
              </div>
              </div>
              </React.Fragment> : <div className="pasVote"><h1>Pas de vote disponible</h1></div>}
            
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Election;
