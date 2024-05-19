const express = require("express");
const router = express.Router();
const initVoteCtrl = require('../controle/InitVoteCtrl');

router.route("/init").post(initVoteCtrl.init);
router.route("/get").get(initVoteCtrl.get);

module.exports = router;