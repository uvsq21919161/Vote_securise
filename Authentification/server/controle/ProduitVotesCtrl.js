const mongoose = require("mongoose");
const {spawn} = require('child_process');

const ProduitVotes = require ('../modeles/ProduitVoteModel');
const Vote = require ('../modeles/VotesModel');
const PublicKey = require('../modeles/PubkeyModel');

const produitVotesCtrl= {};

produitVotesCtrl.calc = async(req, res) => {
    const {candidat} = req.body;

    const votesCand = await Vote.find({"candidat": Number(candidat)})

    const pub = await PublicKey.find();

    const d = new Date();
    const fin = new Date(pub[0].date_fin);

    if (fin > d.getTime()) {
      await PublicKey.findOneAndUpdate({_id: pub[0]._id}, { $set: { date_fin: d.getTime() } })
    }

    let args = [];

    args.push('server/scripts_python/homomorphe.py')
    args.push(pub[0].n2);

    for (let i = 0; i < votesCand.length; i++) {
        args.push(votesCand[i].vote);
    };

    const py = spawn("python", args);

  const result = await new Promise((resolve,reject) => {
    let output;

    py.stdout.on("data", (data) => {
      output = JSON.parse(data);
    });

    py.stderr.on("data", (data) => {
      console.error(`[python] Error occured :${data}`);
      reject(`Error occured in homomorphe.py`);
    });
 
    py.on("exit", (code) => {
      console.log(`child process exited with code ${code}`);
      resolve(output);
    });
  });


  const _id = new mongoose.Types.ObjectId;
  
  const newprod = new ProduitVotes({
    _id: _id,
    produit: result.c_final,
    candidat: candidat
  });

  await newprod.save()
  .then(() => {
    res.json('Produit enregistré avec succès!');
  })
  .catch(err=>{
      res.status(500).json({
          error:err
      })
  });
}

module.exports = produitVotesCtrl;