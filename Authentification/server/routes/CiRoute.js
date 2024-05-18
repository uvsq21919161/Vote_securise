const express = require("express");
const router = express.Router();

const ciCtrl = require("../controle/CiCtrl");

router.route("/add").post(ciCtrl.add);
router.route("/getcandidat").post(ciCtrl.getCandidat);

module.exports = router;