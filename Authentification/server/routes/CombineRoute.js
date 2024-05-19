const express = require("express");
const router = express.Router();
const combineCtrl = require('../controle/CombineCtrl');

router.route("/compute").post(combineCtrl.compute);

module.exports = router;