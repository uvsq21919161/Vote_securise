const mongoose = require("mongoose");

const AdminMail = require('../modeles/AdminModel');

const adminCtrl = {};

adminCtrl.add = async(req, res) => {
    const {mail} = req.body;

    const _id = new mongoose.Types.ObjectId;
    const newAdmin = new AdminMail({
        _id:_id,
        mail: mail
    });

    await newAdmin.save()
        .then(() => {res.json("Mail bien ajouté!")})
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        });
};

adminCtrl.getall = async(req, res) => {
    const result = await AdminMail.find();
    res.json(result);
};

module.exports = adminCtrl;