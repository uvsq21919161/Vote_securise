import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { SidebarContext } from "../components/Sidebarprovider";
import unfold from "../assets/icon/unfold.png";
import { UserContext } from "../../context/usercontext";

function Election() {
  const [candidatsList, setCandidatsList] = useState([]);
  const [selectedCandidat, setSelectedCandidat] = useState(0);
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
  };

  useEffect(() => {
    getCandidats();
  }, []);

  useEffect(() => {
    if (selectedMenu !== "Election") {
      setSelectedMenu("Election");
    }
  }, [selectedMenu]);
  const submitVote = () => {
    // appeler le truc de chiffré
    console.log(msgBulletin);
    console.log("vote envoyé");
  };

  console.log(user)

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
            <div className="flexcontainer">
              <div className="candidats">
                {candidatsList &&
                  candidatsList.map((element, index) => (
                    <div className="slot" key={index}>
                      <div className="candidat" key={index}>
                        <strong className="candidatname">{element}</strong>
                        <img
                          className="unfold_icon"
                          src={unfold}
                          data-index={index}
                          onClick={(e) => {
                            setMsgBulletin(element);
                            setSelectedCandidat(e.target.dataset.index);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                <div className="slot">
                  <div className="candidat" key="999">
                    <strong className="candidatname">Vote blanc</strong>
                    <img
                      className="unfold_icon"
                      src={unfold}
                      onClick={() => {
                        setMsgBulletin("Vote blanc");
                      }}
                    />
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
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Election;
