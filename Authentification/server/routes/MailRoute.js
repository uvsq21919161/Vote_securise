const express = require("express");
const router = express.Router();

const {sendEmail} = require('../controle/MailCtrl');

router.route("/send").post(sendEmail);

module.exports = router;