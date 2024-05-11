const {spawn} = require('child_process');
const mongoose = require("mongoose");

const PublicKey = require('../modeles/PubkeyModel')

const initVoteCtrl = {};

initVoteCtrl.init = async(req,res) => {
  //il faudrait récupérer le nombre de serveurs, le nombre de serveurs min
  // pour déchiffrer et le nombre de candidats
  const {nb_serv, candidats} = req.body; 
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

  const _id = new mongoose.Types.ObjectId;

  const pubkey = new PublicKey({
    _id: _id,
    nb_serv: result.nbserv,
    candidats: result.candidats,
    n: result.n,
    n2: result.n2,
    g: result.g,
    delta: result.delta
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