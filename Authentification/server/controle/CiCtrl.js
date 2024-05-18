const mongoose = require("mongoose");

const Ci = require("../modeles/CiModel");

const ciCtrl = {};

ciCtrl.add = async (req, res) => {
  const { ci, mail, candidat } = req.body;

  const _id = new mongoose.Types.ObjectId();

  const newCi = new Ci({
    _id: _id,
    ci: ci,
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

module.exports = ciCtrl;
