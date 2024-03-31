import './login.css'
function Login() {
  
  return (
    <>
      <div className="flex-container">
        <div className="divleft divs">
        </div>
        <div className="divright divs">
          <h1 className='entete_droite'>
            <b>
              Élection du représentant du groupe
            </b>
          </h1>
          <img className="image_illustration" src="src/assets/login_right.png"/>
          <p className='info little'>
            Bienvenue sur la plateforme de vote du représentant de votre groupe.
          </p>
          <p className='info big'>
            <b>
              Le vote électronique est ouvert du lundi 13/05/24 8:00 au vendredi 24/05/24 17:00 mai (heures de Paris).
            </b>
          </p>
          <p className='nav'>
            Accès organisateur | FAQ | Aide
          </p>
        </div> 
      </div>
    </>
  )
}

export default Login