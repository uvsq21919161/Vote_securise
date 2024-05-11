const express = require("express");
const router = express.Router();
const voteCtrl = require('../controle/VoteCtrl');

router.route("/avoter").post(voteCtrl.avoter);

module.exports = router;