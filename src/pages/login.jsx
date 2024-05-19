import "./login.css";
import { useState, navigate, useContext } from "react";
import axios from "axios";
import boxlogo from "../assets/boxlogo.png";
import logo from "../assets/Comott.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/usercontext";

function Login() {
  const navigate = useNavigate();
  const [numEtu, setNumEtu] = useState("");
  const [errorNumEtu, setErrorNumEtu] = useState("");
  const [code, setCode] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setNumEtu(e.target.value);
  };

  const handleChangeCode = (e) => {
    setCode(e.target.value);
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();
    if (numEtu === "") {
      setErrorNumEtu("Veuillez remplir ce champ");
      return;
    }
    const num = parseInt(numEtu);
    axios.post("/generate", { numero: num }).then(({ data }) => {
      if (data.error) {
        setErrorCode(data.error);
        console.log(data.error);
      }
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === "" && numEtu === "") {
      setErrorCode("Veuillez remplir ce champ");
      return;
    }
    axios.post("/login", { numero :parseInt(numEtu), code: parseInt(code) }).then(({data}) => {
      if (data.error) {
        setErrorCode(data.error);
      } else {
        setUser(data.user);
        navigate("/guide");
      }
    });
  };

  return (
    <>
      <div className="flex-container">
        <div className="divleft divs">
          <div className="logger">
            <h2 className="identification">Identification</h2>
            <div className="textegroupe">
              <p className="part_1" id="n°etu">
                Numéro Étudiant
              </p>
              <p className="petit_texte" id="obligatoire">
                Champs obligatoire
              </p>
            </div>
            <div className="container_input">
              <input
                className="inputGroup"
                id="input_etu"
                placeholder="Numéro étudiant"
                onChange={handleChange}
              ></input>
              <button
                className="button"
                id="sendCode"
                onClick={handleSubmitCode}
              >
                Recevoir le code par email
              </button>
            </div>
            <div className="containerCodeInfo">
              <p className="petit_texte" id="codeInfo">
                Votre code vous a été transmis par email en provenance de
                l’adresse votregroupe@comott.fr à destination de l’adresse
                reliée à votre numéro étudiant. Si vous ne le recevez pas
                immédiatement, merci de patienter quelques minutes et de
                vérifier vos spams avant de réiterer votre demande.
              </p>
            </div>
            <p className="part_1" id="code">
              Code reçu
            </p>
            <div className="container_input">
              <input
                className="inputGroup"
                id="input_code"
                placeholder="X212DZsdqE12546Dqd55DZDdzQF"
                onChange={handleChangeCode}
              ></input>
              <button className="button" id="suivant" onClick={handleSubmit}>
                Suivant
              </button>
            </div>
            <div className="containerCodeInfo">
              <p className="petit_texte" id="bottomInfo">
                Comott collecte et traite vos données dans l’unique but de vous
                permettre de voter de manière sécurisée.
              </p>
            </div>
            <img className="boxlogo" src={boxlogo}></img>
          </div>
          <div className="credit">
            <p className="credit_text">Une solution proposée par</p>
            <div className="image_container">
              <img className="logoCredit" src={logo} />
            </div>
          </div>
        </div>
        <div className="divright divs">
          <h1 className="entete_droite">
            <b>Élection du représentant du groupe</b>
          </h1>
          <img
            className="image_illustration"
            src="src/assets/login_right.png"
          />
          <p className="info little">
            Bienvenue sur la plateforme de vote du représentant de votre groupe.
          </p>
          <p className="info big">
            <b>
              Le vote électronique est ouvert du lundi 13/05/24 8:00 au vendredi
              24/05/24 17:00 mai (heures de Paris).
            </b>
          </p>
          <p className="nav">Accès organisateur | FAQ | Aide</p>
        </div>
      </div>
    </>
  );
}

export default Login;
