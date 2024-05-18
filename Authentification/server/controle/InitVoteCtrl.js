const {spawn} = require('child_process');
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const PublicKey = require('../modeles/PubkeyModel');
const AdminMail = require('../modeles/AdminModel');

const initVoteCtrl = {};


const transporter = nodemailer.createTransport({
    host: 'mail.gmx.com',
    port: 587,
    tls:{
        ciphers : 'SSLv3',
        rejectUnauthorized: false
    },
    auth: {
      user: "mycomott@gmx.fr",
      pass: "Jesuiscomottdeouf78180!",
    },
    tls: {
      rejectUnauthorized: false
    }
  });

const sendEmail = async(email, sk) => {
    await transporter.sendMail({
        from: "mycomott@gmx.fr",
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

  for (let i = 1; i < nb_serv + 1; i++) {
    sendEmail(allMails[i-1].mail,result.liste_ski[i.toString()]+"\n Voici vote numéro (indice) :"+i.toString())
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

module.exports = initVoteCtrl;