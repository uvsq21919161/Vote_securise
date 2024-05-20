const mongoose = require("mongoose");

const Vote = require ('../modeles/VotesModel');

const voteCtrl= {};

voteCtrl.avoter = async(req,res) => {
  const {empreinte, vote, candidat} = req.body;

  const _id = new mongoose.Types.ObjectId;
  const newvote = new Vote({
    _id: _id,
    empreinte: empreinte,
    vote: vote,
    candidat: candidat
  });

  await newvote.save()
  .then(() => {
    res.json('Vote enregistré avec succès!');
  })
  .catch(err=>{
      res.status(500).json({
          error:err
      })
  });
};

voteCtrl.findByEmpreinte = async(req, res) => {
  const {empreinte} = req.body;
  console.log("je suis dans le findbyempreinte, voici l'empreinte:",empreinte);
  const votes = await Vote.find({empreinte:empreinte});

  if (votes.length > 0) {
    res.json("Vote retrouvé dans la base de donnée.");
  } else {
    res.json("Empreinte non valide.")
  }
};

voteCtrl.getNumberOfVotes = async(req, res) => {
  const allVotes = await Vote.find();

  res.json(allVotes.length);
}

module.exports = voteCtrl;