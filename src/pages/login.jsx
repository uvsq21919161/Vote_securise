import "./login.css";
import { useState, navigate, useContext, useEffect } from "react";
import axios from "axios";
import boxlogo from "../assets/boxlogo.png";
import logo from "../assets/Comott.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/usercontext";
import API from '../constants/Apis';

function Login() {
  const navigate = useNavigate();
  const [numEtu, setNumEtu] = useState("");
  const [errorNumEtu, setErrorNumEtu] = useState("");
  const [code, setCode] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [jour, setJour] = useState("");
  const [mois, setMois] = useState("");
  const [heure, setHeure] = useState("");
  const [minute, setMinute] = useState("");
  const [anne, setAnne] = useState("");
  const [voteFini, setVoteFini] = useState(false);
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

  const organisateurLogin = () => {
    navigate("/loginOrga")
  }

  const adminLogin = () => {
    navigate("/loginAdmin")
  }

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
  }, [])

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
              {voteFini ? <p>Le vote électronique est fermé. Connectez vous pour visualiser les résultats.</p>
              : <p>Le vote électronique est ouvert jusqu'a {heure}:{minute} le {jour}/{mois}/{anne}</p>}
            </b>
          </p>
          <p className="nav" style={{marginTop:"120px"}} onClick={organisateurLogin}>Accès organisateur</p>
          <p className="nav" onClick={adminLogin} style={{marginTop:"-50px", marginBottom:"-20px"}}>Accès admin</p>
          <p className="nav"> FAQ | Aide</p>
        </div>
      </div>
    </>
  );
}

export default Login;
