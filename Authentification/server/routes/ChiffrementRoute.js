const express = require("express");
const router = express.Router();
const chiffreContr = require('../controle/ChiffrementCtrl');

router.route("/chiffre").post(chiffreContr.chiffre);

module.exports = router;