const express = require("express");
const router = express.Router();
const userCtrl = require("../controle/UserCtrl");

router.route("/add").post(userCtrl.add);
router.route("/updateRecepisse").put(userCtrl.updateRecepisse);
router.route("/get").post(userCtrl.get);
router.route("/sendMail").post(userCtrl.sendMail);

module.exports = router;