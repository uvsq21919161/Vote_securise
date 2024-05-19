// Imports
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Fonction Login
function Login() {
  const navigate = useNavigate();
  // Objet contenant des strings pour chaque champ.
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    errorMsg: "",
  });

  /** Fonction qui permet de valider le formulaire.
   * Vérifie que tous les champs sont remplis selon les critères.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    const fields = ["username", "password"];
    new Signin(formData, fields, navigate, setFormData);
  };

  /** Modifie la valeur d'un champ lors de la saisie.
   */
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleforget = async () => {
    axios.post("/forgotpassword");
  }

  // Rendu
  return (
    <div className="screen">
      <div className="container">
        <div className="Left side">
          <h2 className="text-center">Log in</h2>
          <form className="signupForm" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username" className="label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="input"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="input"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
            <span className="error-message">{formData.errorMsg}</span>
            <button className="button" type="submit">
              Log in
            </button>
          </form>
          {/* <Link className="link" to="/register">
            Forgot your password?
          </Link> */}
          <a className="link" onClick={handleforget}>
            Forgot your password?
          </a>
          <hr></hr>
          <Link className="link" to="/register">
            Don't have an account? Sign up here!
          </Link>
        </div>
        <div className="Right side" />
      </div>
    </div>
  );
}

// Export
export default Login;
