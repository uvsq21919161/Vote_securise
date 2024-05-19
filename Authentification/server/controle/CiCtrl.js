const mongoose = require("mongoose");

const Ci = require("../modeles/CiModel");

const ciCtrl = {};

ciCtrl.add = async (req, res) => {
  const { ci, mail, candidat, indice} = req.body;

  const _id = new mongoose.Types.ObjectId();

  const newCi = new Ci({
    _id: _id,
    ci: ci,
    indice: indice,
    mailadmin: mail,
    candidat: candidat,
  });

  await newCi
    .save()
    .then(() => {
      res.json("Ci enregistrée avec succès!");
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

ciCtrl.getCandidat = async(req, res) => {
  const {candidat} = req.body;

  const candidatci = await Ci.find({"candidat": candidat}).sort({indice:1});

  let l = [];

  for (let i = 0; i < candidatci.length; i++) {
    l.push(candidatci[i].ci);
  };

  res.json(l);
}

module.exports = ciCtrl;
