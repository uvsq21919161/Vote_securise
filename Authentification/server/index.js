// Imports
// Framework pour node.js
const express = require("express");
const dotenv = require("dotenv").config();
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");

// Créer l'instance de l'application
const app = express();

// Connexion à la base de données
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connexion bdd reussie"))
  .catch((err) => console.log("Connexion bdd echouée", err));

// Paramètrage de l'application principale
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Définit le chemin pour retrouver les modules du serveur
app.use("/", require("./routes/authRoutes"));

// Choix du part et affichage
const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
