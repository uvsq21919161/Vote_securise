const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const Organisateur = require('../modeles/Organisateur')

const organisateurCtrl = {};

organisateurCtrl.add = async(req, res) => {
    const {password} = req.body;

    const hashed = bcrypt.hashSync(password, 10);

    const _id = new mongoose.Types.ObjectId;
    const newOrg = new Organisateur({
        _id: _id,
        password: hashed
    });

    await newOrg.save()
    .then(() => {
        res.json('Organisateur ajouté avec succès!');
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    });
}

organisateurCtrl.log = async(req,res) => {
    const {password} = req.body;

    const orga = await Organisateur.find();

    const passOG = orga[0].password;

    if (bcrypt.compareSync(password, passOG)) {
        res.json("Password valide");
    } else {
        res.json("Password invalide");
    }
}

module.exports = organisateurCtrl;