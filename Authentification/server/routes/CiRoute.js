const express = require("express");
const router = express.Router();

const ciCtrl = require("../controle/CiCtrl");

router.route("/add").post(ciCtrl.add);

module.exports = router;