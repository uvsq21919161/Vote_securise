const express = require("express");
const router = express.Router();

const adminCtrl = require('../controle/AdminCtrl');

router.route("/add").post(adminCtrl.add);
router.route("/getall").get(adminCtrl.getall);

module.exports = router;