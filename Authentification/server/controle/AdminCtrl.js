const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const AdminMail = require('../modeles/AdminModel');

const adminCtrl = {};

adminCtrl.add = async(req, res) => {
    const {mail, password, nom, prenom} = req.body;

    const hashed = bcrypt.hashSync(password, 10);

    const _id = new mongoose.Types.ObjectId;
    const newAdmin = new AdminMail({
        _id:_id,
        mail: mail,
        password: hashed,
        nom: nom,
        prenom: prenom
    });

    await newAdmin.save()
        .then(() => {res.json("Mail bien ajouté!")})
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        });
};

adminCtrl.log = async(req, res) => {
    const {mail, password} = req.body;

    const admin = await AdminMail.find({"mail":mail});

    if (admin.length > 0){
        const passOG = admin[0].password
        if (bcrypt.compareSync(password, passOG)) {
            res.json("Password valide");
        } else {
            res.json("Password invalide");
        }
    } else {
        res.json("Mail inexistant dans la bdd");
    }
}

adminCtrl.getall = async(req, res) => {
    const result = await AdminMail.find();
    res.json(result);
};

module.exports = adminCtrl;