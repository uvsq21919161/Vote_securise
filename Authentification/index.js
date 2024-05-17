// Imports
// Framework pour node.js
const express = require("express");
const dotenv = require("dotenv").config();
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require('cors');

// Créer l'instance de l'application
const app = express();
console.log("marche ta mère", process.env.MONGO_URL);
// Connexion à la base de données
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connexion bdd reussie"))
  .catch((err) => console.log("Connexion bdd echouée", err));

// Paramètrage de l'application principale
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

console.log("marche ta mère");
// Définit le chemin pour retrouver les modules du serveur
app.use('/api/chi', require('./server/routes/ChiffrementRoute'));
app.use('/api/init', require('./server/routes/InitVoteRoute'));
app.use('/api/vote', require('./server/routes/VoteRoute'));

// Choix du part et affichage
const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
