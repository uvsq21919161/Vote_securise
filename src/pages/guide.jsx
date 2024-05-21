import React, { useContext, useEffect, useRef } from "react";
import "./guide.css";
import img_login from "../assets/guide/ImgLogin.png";
import img_tableau from "../assets/guide/imgTableau.png";
import img_election1 from "../assets/guide/imgElection1.png";
import img_visu from "../assets/guide/imgVisuUrne.png";
import img_resultats from "../assets/guide/imgResultats.png";
import img_bureau from "../assets/guide/imgBureau.png";
import img_listecandidats from "../assets/guide/imgListeCandidats.png";
import img_validation from "../assets/guide/imgValidation.png";
import img_recepisse from "../assets/guide/imgRecepisse.png";
import { SidebarContext } from "../components/Sidebarprovider";

function Guide() {
  const { isSideBarExpanded, setIsSideBarExpanded } =
    useContext(SidebarContext);

  const { selectedMenu, setSelectedMenu } = useContext(SidebarContext);
  useEffect (() => {
   if (selectedMenu !== "Guide") {
    setSelectedMenu("Guide");
   } 
  },[selectedMenu]);
  const styleSidebarexpanded = {
    marginLeft: isSideBarExpanded ? "275px" : "55px",
    transition: "margin-left 0.2s ease",
  };

  const targetchap1 = useRef(null);
  const targetchap2 = useRef(null);
  const targetchap3 = useRef(null);
  const targetchap4 = useRef(null);
  const targetpartie1_1 = useRef(null);
  const targetpartie2_1 = useRef(null);
  const targetpartie2_2 = useRef(null);
  const targetpartie2_3 = useRef(null);
  const targetpartie2_4 = useRef(null);
  const targetpartie3_1 = useRef(null);
  const targetpartie3_2 = useRef(null);
  const targetpartie3_3 = useRef(null);
  const targetpartie3_4 = useRef(null);
  const targetpartie3_5 = useRef(null);

  const redirection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <React.Fragment>
      <div className="calque">
        <div className="container">
          <div className="page" style={styleSidebarexpanded}>
            <div className="exemple" />
            {
              <div className="entete">
                <h1 className="title">Guide de l'électeur</h1>
                <p className="headinfo">
                  Voici un guide de l'électeur pour vous indiquer comment
                  procéder.
                </p>
                <br />
                <br />
                <p className="plan">Plan</p>
                <ul className="plancontainer">
                  <li>
                    <p
                      className="chapitre"
                      onClick={() => redirection(targetchap1)}
                    >
                      Accès à la plateforme de vote
                    </p>
                    <ul className="partiecontainer">
                      <li>
                        <p
                          className="point"
                          onClick={() => redirection(targetpartie1_1)}
                        >
                          Code temporaire
                        </p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p
                      className="chapitre"
                      onClick={() => redirection(targetchap2)}
                    >
                      Tableau de bord
                    </p>
                    <ul className="partiecontainer">
                      <li>
                        <p
                          className="point"
                          onClick={() => redirection(targetpartie2_1)}
                        >
                          Afficher les candidatures
                        </p>
                      </li>
                      <li>
                        <p
                          className="point"
                          onClick={() => redirection(targetpartie2_2)}
                        >
                          Visualiser l’urne
                        </p>
                      </li>
                      <li>
                        <p
                          className="point"
                          onClick={() => redirection(targetpartie2_3)}
                        >
                          Accéder aux résultats
                        </p>
                      </li>
                      <li>
                        <p
                          className="point"
                          onClick={() => redirection(targetpartie2_4)}
                        >
                          Voir les membres du bureau de vote
                        </p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p
                      className="chapitre"
                      onClick={() => redirection(targetchap3)}
                    >
                      Comment voter
                    </p>
                    <ul className="partiecontainer">
                      <li>
                        <p
                          className="point"
                          onClick={() => redirection(targetpartie3_1)}
                        >
                          Accéder au scrutin
                        </p>
                      </li>
                      <li>
                        <p
                          className="point"
                          onClick={() => redirection(targetpartie3_2)}
                        >
                          Sélectionner une candidature
                        </p>
                      </li>
                      <li>
                        <p
                          className="point"
                          onClick={() => redirection(targetpartie3_3)}
                        >
                          Voter blanc
                        </p>
                      </li>
                      <li>
                        <p
                          className="point"
                          onClick={() => redirection(targetpartie3_4)}
                        >
                          Valider son bulletin
                        </p>
                      </li>
                      <li>
                        <p
                          className="point"
                          onClick={() => redirection(targetpartie3_5)}
                        >
                          Récepissé de vote
                        </p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <p
                        className="chapitre"
                        onClick={() => redirection(targetchap4)}
                      >
                        Visualisation des serveurs
                      </p>
                    </ul>
                  </li>
                </ul>
              </div>
            }
            <div className="flexcontainer" id="guide_flex"></div>
            <div className="chaptitre" ref={targetchap1}>
              <p>I - Accès à la plateforme de vote</p>
            </div>
            <p className="paragrapheChap">
              Votre identifiant votant personnel est votre numéro étudiant,
              retrouvable sur votre compte IZLY.
              <br />
              Un code confidentiel, valable durant 3 minutes, vous est ensuite
              envoyé par email, à l'adresse reliée à votre compte IZLY.
              <br />
              <br />
              À l'aide d'un ordinateur, d'une tablette ou d'un téléphone relié à
              internet, vous devez vous connecter au site dédié à l'élection.
              <br />
              La plateforme de vote est accessible sur tout type de navigateur à
              jour de la dernière version majeure (Google Chrome, Microsoft
              Edge, Safari, Mozilla Firefox).
              <br />
              <br />
              Vous devez saisir sur la page <strong>Identification</strong> :
            </p>
            <p className="enumeration">
              <li>Votre identifiant votant</li>
              <li>Le code reçu par email</li>
            </p>
            <div className="flexcontainer" id="guide_flex">
              <div className="imgContainer">
                <img className="imageLogin" src={img_login}></img>
              </div>
            </div>
            <br />
            <p className="paragrapheChap">
              Une fois connecté à la plateforme de vote, vous serez
              automatiquement redirigé vers le <strong>Tableau de bord</strong>.
            </p>
            <br />
            <div className="flexcontainer" id="guide_flex">
              <div className="imgContainer">
                <img className="imageTableau" src={img_tableau}></img>
              </div>
            </div>
            <br />
            <br />
            <div className="partietitre" ref={targetpartie1_1}>
              <p>1. Code temporaire</p>
            </div>
            <p className="paragraphePoint">
              <br />
              Votre code temporaire vous a été transmis par email en provenance
              de l'adresse votregroupe@comott.fr.
              <br />
              Veuillez effectuer une recherche avec votregroupe@comott.fr et
              vérifier le dossier de vos courriers indésirables.
              <br />
              Vous pouvez demander la génération d'un nouveau code temporaire
              via la page
              <strong> Inscription</strong>.
              <br />
              Si l'adresse email renseignée dans le formulaire est bien la même
              que celle importée au sein du système, vous recevrez
              automatiquement un nouveau code temporaire par email.
            </p>
            <div className="chaptitre" ref={targetchap2}>
              <p>II - Tableau de bord</p>
            </div>
            <div className="partietitre" ref={targetpartie2_1}>
              <p>1. Afficher les candidatures</p>
            </div>
            <div>
              <p className="paragraphePoint">
                <br />
                Avant, pendant et après le vote, vous pouvez vous connecter sur
                la plateforme de vote et accéder à la liste des candidatures.
                <br />
                Cette étape vous permet de consulter la liste des candidatures
                avant le vote et de consulter les documents associés.
                <br />
                Pour accéder à la liste des candidatures, connectez-vous sur la
                plateforme de vote et cliquez sur le lien "Afficher les
                candidatures" sur le tableau de bord électeur.
                <br />
                <br />
              </p>
              <div className="flexcontainer" id="guide_flex">
                <div className="imgContainer Election1">
                  <img className="imageElection1" src={img_election1}></img>
                </div>
              </div>
            </div>
            <br />
            <div className="partietitre" ref={targetpartie2_2}>
              <p>2. Visualiser l'urne</p>
            </div>
            <div>
              <p className="paragraphePoint">
                <br />
                Pour visualiser l'urne, connectez-vous sur la plateforme de vote
                et cliquez sur le lien <strong>Visualiser l'urne</strong>.
                <br />
                Juste après avoir envoyé votre bulletin dans l'urne, un numéro
                de série aléatoire et unique sera attribué à votre bulletin et
                affiché à l'écran.
                <br />
                Vous pouvez conserver ce numéro de série et interroger l'urne à
                n'importe quel moment pour vérifier que votre bulletin s'y
                trouve bien et que son empreinte n'a pas changé.
                <br />
                Vous pouvez également consulter le nombre de bulletins dans
                l'urne.
                <br />
                <br />
              </p>
              <div className="flexcontainer" id="guide_flex">
                <div className="imgContainer VisuUrne">
                  <img className="imageVisuUrne" src={img_visu}></img>
                </div>
              </div>
            </div>
            <br />
            <div className="partietitre" ref={targetpartie2_3}>
              <p>3. Accéder aux résultats</p>
            </div>
            <div>
              <p className="paragraphePoint">
                <br />
                Une fois le dépouillement effectué par les membres du bureau,
                l'organisateur du vote peut proclamer les résultats et les
                rendre accessibles via la plateforme de vote.
                <br />
                Pour accéder aux résultats, connectez-vous sur la plateforme de
                vote et cliquez sur le bouton "Résultats" sur la droite du vote
                correspondant.
                <br />
                <br />
                L'ensemble des résultats s'affichera alors à l'écran.
                <br />
                <br />
              </p>
              <div className="flexcontainer" id="guide_flex">
                <div className="imgContainer Resultats">
                  <img className="imageResultats" src={img_resultats}></img>
                </div>
              </div>
            </div>
            <div className="partietitre" ref={targetpartie2_4}>
              <p>4. Voir les membres du bureau de vote</p>
            </div>
            <div>
              <p className="paragraphePoint">
                <br />
                Avant, pendant et après le vote, vous pouvez consulter la liste
                des membres du bureau responsables du bon déroulement des
                opérations de vote.
                <br />
                Les membres du bureau ont accès à une interface sur la
                plateforme de vote leur permettant de suivre les élections et de
                détecter tout dysfonctionnement.
                <br />
                Pour accéder à la liste des membres du bureau, connectez-vous
                sur la plateforme de vote et cliquez sur le lien "Voir les
                membres du bureau".
                <br />
                <br />
              </p>
              <div className="flexcontainer" id="guide_flex">
                <div className="imgContainer Bureau">
                  <img className="imageBureau" src={img_bureau}></img>
                </div>
              </div>
            </div>
            <div className="chaptitre" ref={targetchap3}>
              <p>III - Comment voter</p>
            </div>
            <div className="partietitre" ref={targetpartie3_1}>
              <p>1. Accéder au scrutin</p>
            </div>
            <div>
              <p className="paragraphePoint">
                <br />
                Une fois identifié sur la plateforme de vote, vous serez
                automatiquement redirigé vers le premier scrutin en cours, ou à
                défaut, vers votre tableau de bord.
                <br />
                Celui-ci contient les différents scrutins configurés sur la
                plateforme auxquels vous avez accès.
                <br />
                Si le vote est en cours, vous pouvez cliquer sur le bouton
                "Voter" pour accéder à la liste des candidatures et exprimer
                votre choix.
                <br />
                <br />
              </p>
            </div>
            <div className="partietitre" ref={targetpartie3_2}>
              <p>2. Sélectionner une candidature</p>
            </div>
            <div>
              <p className="paragraphePoint">
                <br />
                Il sera nécessaire de cliquer une première fois sur le nom de la
                candidature avant de pouvoir accéder au bouton "Sélectionner
                cette candidature".
                <br />
                <br />
                La candidature sélectionnée s'affiche alors dans votre bulletin
                sur la droite de l'écran. Vous n'avez plus qu'à cliquer sur le
                bouton "Etape suivante" pour accéder à l'étape de confirmation.
                <br />
                <br />
              </p>
              <div className="flexcontainer" id="guide_flex">
                <div className="imgContainer ListeCandidats">
                  <img
                    className="imageListeCandidats"
                    src={img_listecandidats}
                  ></img>
                </div>
              </div>
              <br />
              <br />
            </div>
            <div className="partietitre" ref={targetpartie3_3}>
              <p>3. Voter blanc</p>
            </div>
            <div>
              <p className="paragraphePoint">
                <br />
                Vous pouvez choisir de ne voter pour aucune des candidatures
                mais d'exprimer un vote blanc.
                <br />
                Votre bulletin ne sera alors pas comptabilisé dans le calcul du
                quorum.
                <br />
                <br />
                Le choix du vote blanc est affiché en dessous des autres
                candidatures.
                <br />
                <br />
              </p>
            </div>
            <div className="partietitre" ref={targetpartie3_4}>
              <p>4. Valider son bulletin</p>
            </div>
            <div>
              <p className="paragraphePoint">
                <br />
                Une fois votre choix effectué, veuillez cliquer sur le bouton
                "Etape suivante".
                <br />
                <br />
                Un nouvel écran de confirmation affichera le contenu de votre
                bulletin.
                <br />
                S'il correspond bien à ce que vous souhaitez voter, cliquez sur
                le bouton "Envoyer définitivement votre bulletin".
                <br />
                <br />
                <strong>
                  Attention, une fois envoyé, votre bulletin ne peut plus être
                  modifié.
                </strong>
                <br />
                <br />
                Vous pouvez également voir l'empreinte numérique de votre
                bulletin avant l'envoi.
                <br />
                Cette empreinte ne changera jamais et vous permet, suite à
                l'envoi dans l'urne, de vérifier que le système a bien pris en
                compte votre bulletin et que son empreinte est bien toujours la
                même.
                <br />
                <br />
                Ce procédé, défini par la CNIL comme la "transparence de
                l'urne", vous permet de vous assurer à n'importe quel moment que
                votre bulletin est bien présent et qu'il n'a jamais été modifié
                depuis sa construction sur votre navigateur.
                <br />
                <br />
              </p>
              <div className="flexcontainer" id="guide_flex">
                <div className="imgContainer Validation">
                  <img className="imageValidation" src={img_validation}></img>
                </div>
              </div>
              <br />
              <br />
            </div>
            <div className="partietitre" ref={targetpartie3_5}>
              <p>5. Récepissé de vote</p>
            </div>
            <div>
              <p className="paragraphePoint">
                <br />
                Une fois votre vote exprimé, un récépissé vous sera
                automatiquement envoyé sur votre adresse email.
                <br />
                Celui-ci contient la preuve de votre enregistrement dans la
                liste d'émargement.
                <br />
                Vous pouvez à tout moment télécharger de nouveau ce récépissé de
                vote via votre tableau de bord.
                <br />
                <br />
                Juste avant l'envoi de votre bulletin dans l'urne, l'empreinte
                numérique de votre bulletin est affichée.
                <br />
                Elle est calculée par votre propre navigateur web avant l'envoi
                du bulletin et vous permet ainsi de vérifier qu'une fois
                réceptionné dans l'urne, votre bulletin n'a pas été modifié.
                <br />
                <br />
                Lors de l'insertion de votre bulletin dans l'urne, un numéro de
                série aléatoire a été généré.
                <br />
                Vous pouvez le voir à l'écran et le télécharger une fois votre
                bulletin envoyé.
                <br />
                Nous vous affichons également l'empreinte du bulletin qui a été
                transmise à l'urne, cette empreinte doit correspondre à celle
                qui était affichée à l'écran avant l'envoi, vous permettant
                ainsi de vérifier que ce qui a été enregistré correspond bien au
                bulletin qui a été préparé sur votre navigateur.
                <br />
                Vous pouvez interroger l'urne avec ce numéro de série pour
                vérifier que votre bulletin est non seulement bien présent, mais
                également qu'il n'a pas été modifié grâce à la vérification de
                son empreinte numérique.
                <br />
                <br />
                Il convient de garder l'empreinte et le numéro de série secrets,
                ils vous permettent de suivre votre bulletin dans l'urne.
                <br />
                Par souci de confidentialité, ni le numéro de série ni
                l'empreinte ne sont associés à votre identité et après avoir été
                affichés, ils ne seront plus accessibles.
                <br />
                <br />
              </p>
              <div className="flexcontainer" id="guide_flex">
                <div className="imgContainer Recepisse">
                  <img className="imageRecepisse" src={img_recepisse}></img>
                </div>
              </div>
            </div>
            <div className="chaptitre" ref={targetchap4}>
              <p>IV - Visualisation des serveurs</p>
            </div>
            <div>
              <p className="paragraphePoint">
                <br />
                Pour visualiser et comprendre un peu mieux le fonctionnement du
                vote, vous pouvez cliquer sur l'onglet{" "}
                <strong>Visualisation des serveurs</strong>.
                <br />
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Guide;
