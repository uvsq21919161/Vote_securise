// Imports
// Framework pour node.js
const express = require("express");
const dotenv = require("dotenv").config();
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require('cors');

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

app.use("/", require("./routes/authRoutes"));

// Définit le chemin pour retrouver les modules du serveur
app.use('/api/orga', require('./routes/OrganisateurRoute'));
app.use('/api/combine', require('./routes/CombineRoute'));
app.use('/api/candidat', require('./routes/CandidatRoute'));
app.use('/api/ci', require('./routes/CiRoute'));
app.use('/api/produit', require('./routes/ProduitVote'));
app.use('/api/admin', require('./routes/AdminRoute'));
app.use('/api/mail', require('./routes/MailRoute'));
app.use('/api/chi', require('./routes/ChiffrementRoute'));
app.use('/api/init', require('./routes/InitVoteRoute'));
app.use('/api/vote', require('./routes/VoteRoute'));

// Choix du part et affichage
const port = 7000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
