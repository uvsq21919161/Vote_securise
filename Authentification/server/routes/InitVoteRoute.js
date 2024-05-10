const express = require("express");
const router = express.Router();
const initVoteCtrl = require('../controle/InitVoteCtrl');

router.route("/init").get(initVoteCtrl.init);

module.exports = router;