const mongoose = require("mongoose");

const Candidat = require('../modeles/Candidats');

const candidatCtrl = {};

candidatCtrl.add = async(req,res) => {
    const {nom, description} = req.body;

    const max_value = await Candidat.find().sort({id_candidat:-1}).limit(1);
    let id_candidat = 0;
    if (max_value.length > 0) {
        id_candidat = max_value[0].id_candidat + 1;
    };

    const _id = new mongoose.Types.ObjectId;
    const newCandidat = new Candidat({
        _id: _id,
        id_candidat: id_candidat,
        nom: nom,
        description: description,
        resultat: 0
    });

    await newCandidat.save()
    .then(() => {
        res.json('Candidat créé avec succès!');
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    });
}

candidatCtrl.update = async(req,res) => {
    const {idcandidat, resultat} = req.body;

    await Candidat.findOneAndUpdate({id_candidat: idcandidat}, {resultat: resultat})
        .then(() => {
            res.json('Resultats mis a jour avec succès!');
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        });
}

candidatCtrl.getAll = async(req, res) => {
    const allCands = await Candidat.find();
}

module.exports = candidatCtrl;