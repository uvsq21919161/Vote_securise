const express = require("express");
const router = express.Router();

const candidatCtrl = require('../controle/CandidatsCtrl');

router.route("/add").post(candidatCtrl.add);
router.route("/update").put(candidatCtrl.update);
router.route("/getAll").get(candidatCtrl.getAll);

module.exports = router;