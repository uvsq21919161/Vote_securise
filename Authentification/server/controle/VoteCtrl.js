const mongoose = require("mongoose");

const Vote = require ('../modeles/VotesModel');

const voteCtrl= {};

voteCtrl.avoter = async(req,res) => {
  const {uid, vote, candidat} = req.body;

  const _id = new mongoose.Types.ObjectId;
  const newvote = new Vote({
    _id: _id,
    uid: uid,
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
}

module.exports = voteCtrl;