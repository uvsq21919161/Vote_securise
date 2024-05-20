const {spawn} = require('child_process');
const mongoose = require("mongoose");

const PublicKey = require('../modeles/PubkeyModel');
const Vote = require ('../modeles/VotesModel');
const User = require('../modeles/user');

const chiffreContr = {};

chiffreContr.chiffre = async(req,res) => {
  //ici faudrait aller récupérer sur la bdd :
  // -le nombre de candidats
  // -n
  // -g
  // -le user id du mec qui vote
  //on doit aussi récup le message que le boug veut chiffrer mais on le récup dans les args
  //de la requête pas sur la bdd

  const {message, email} = req.body;

  const empreinte = await User.find({"email":email});

  if (empreinte[0].recepisse !== "0") {
    res.json("Vote terminé ou vous avez déja voté...");
    return;
  }

  const pub = await PublicKey.find();

  //donc c'est les 4 lignes d'après qu'il faudra changer en allant chercher les infos
  // dans la bdd
  const candidats = pub[0].candidats;
  const g = pub[0].g;
  const n = pub[0].n;

  const d = new Date();
  const fin = new Date(pub[0].date_fin);
  if (fin < d.getTime()) {
    console.log("vote terminé");
    res.json("Vote terminé ou vous avez déja voté...");
    return;
  }

  const py = spawn("python", ['server/scripts_python/backendCrypt.py',message,candidats,g,n]);

  const result = await new Promise((resolve,reject) => {
    let output;

    py.stdout.on("data", (data) => {
      output = JSON.parse(data);
    });

    py.stderr.on("data", (data) => {
      console.error(`[python] Error occured :${data}`);
      reject(`Error occured in backendInit.py`);
    });
 
    py.on("exit", (code) => {
      console.log(`child process exited with code ${code}`);
      resolve(output);
    });
  });
  res.json(result);  
}

module.exports = chiffreContr;
