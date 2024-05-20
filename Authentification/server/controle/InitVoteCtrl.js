const {spawn} = require('child_process');
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const PublicKey = require('../modeles/PubkeyModel');
const AdminMail = require('../modeles/AdminModel');
const Ci = require("../modeles/CiModel");
const Candidat = require('../modeles/Candidats');
const Vote = require('../modeles/VotesModel');
const ProduitVotes = require('../modeles/ProduitVoteModel');
const User = require('../modeles/user');

const initVoteCtrl = {};


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD, //process.env.PASSWORD,
  }
});

const sendEmail = async(email, sk) => {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Ci-joint la clé secrète qui vous est associée",
        text: sk
    });
};

initVoteCtrl.init = async(req,res) => {
  //il faudrait récupérer le nombre de serveurs, le nombre de serveurs min
  // pour déchiffrer et le nombre de candidats
  const {nb_serv, candidats, date_fin} = req.body; 

  const allMails = await AdminMail.find();

  if (nb_serv > allMails.length) {
    res.json("Pas assez de mails admin dans la base de donnée...");
    return;
  }

  await PublicKey.deleteMany({});
  await Ci.deleteMany({});
  await Candidat.deleteMany({});
  await Vote.deleteMany({});
  await ProduitVotes.deleteMany({});

  const allUsers = await User.find();

  for (let i = 0; i < allUsers.length; i++) {
    await User.findOneAndUpdate({email: allUsers[i].email}, { $set: { recepisse: "0" } });
  };

  const py = spawn("python", ['server/scripts_python/backendInit.py',nb_serv.toString(),candidats.toString()]);

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


  for (let i = 0; i < nb_serv; i++) {
    //console.log("admin",i,"=",allMails[i-1]);
    sendEmail(allMails[i].mail,result.liste_ski[(i+1).toString()]+"\n Voici vote numéro (indice) :"+i.toString())
  }

  const _id = new mongoose.Types.ObjectId;

  const pubkey = new PublicKey({
    _id: _id,
    nb_serv: result.nbserv,
    candidats: result.candidats,
    n: result.n,
    n2: result.n2,
    g: result.g,
    delta: result.delta,
    teta: result.teta,
    date_fin: date_fin
  });
  
  await pubkey.save()
  .then(() => {
    res.json('PubKey créée avec succès!');
  })
  .catch(err=>{
      res.status(500).json({
          error:err
      })
  });

};

initVoteCtrl.get = async(req, res) => {
  const pubkey = await PublicKey.find();

  res.json(pubkey[0]);
}

module.exports = initVoteCtrl;