const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const User = require('../modeles/user');

const userCtrl = {};

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD, //process.env.PASSWORD,
    }
  });

const sendEmail = async(email, recepisse) => {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Votre récépissé de vote",
        text: recepisse
        });
    };

userCtrl.add = async(req, res) => {
    const {mail, numero} = req.body;

    const _id = new mongoose.Types.ObjectId;

    const newUser = new User({
        _id: _id,
        email: mail,
        numero: numero,
        code: 0,
        recepisse: "0"
    });

    await newUser.save()
        .then(() => {res.json("User bien ajouté!")})
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        });

}

userCtrl.updateRecepisse = async(req, res) => {
    const {email, recepisse} = req.body;

    await User.findOneAndUpdate({email: email}, { $set: { recepisse: recepisse } })
        .then(() => {
            res.json('Recepisse mis a jour avec succès!');
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        });
};

userCtrl.get = async(req, res) => {
    const {email} = req.body;

    const found = await User.find({email:email});

    res.json(found[0]);
};

userCtrl.sendMail = async(req, res) => {
    console.log("je suis dans le sendMail.")
    const {email, recepisse} = req.body;

    sendEmail(email, recepisse);

    res.json("Mail envoyé.")
}

module.exports = userCtrl;