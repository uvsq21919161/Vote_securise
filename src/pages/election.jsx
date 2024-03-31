import Sidebar from "../components/Sidebar";
import "./style.css";

function Election() {
  return (
    <>
      <div className="container">
        <Sidebar />
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
      </div>
    </>
  );
}

export default Election;
