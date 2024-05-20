// Imports
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

/**
 * Structure des données de l'utilisateur
 * @email : l'email de l'utilisateur, unique dans la base de données
 * @username : le nom d'utilisateur, unique dans la base de données
 * @password : le mot de passe, qui sera haché
 *  */
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  numero: {
    type: Number,
    unique: true,
  },
  code: Number,
  recepisse: String
});

// Connexion de mongoose, une API de mongoDB, au modèle
const User = model("User", userSchema);

// Export
module.exports = User;
