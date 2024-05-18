const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'mail.gmx.com',
    port: 587,
    tls:{
        ciphers : 'SSLv3',
        rejectUnauthorized: false
    },
    auth: {
      user: "mycomott@gmx.fr",
      pass: "Jesuiscomottdeouf78180!",
    },
    tls: {
      rejectUnauthorized: false
    }
  });

const sendEmail = async(req, res) => {
    const {email, sk} = req.body;
    await transporter.sendMail({
        from: "mycomott@gmx.fr",
        to: email,
        subject: "Ci-joint la clé secrète qui vous est associée",
        text: sk
    });
};

module.exports = {sendEmail};