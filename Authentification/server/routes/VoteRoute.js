const express = require("express");
const router = express.Router();
const voteCtrl = require('../controle/VoteCtrl');

router.route("/avoter").post(voteCtrl.avoter);
router.route("/findByEmpreinte").post(voteCtrl.findByEmpreinte);
router.route("/numberOfVotes").get(voteCtrl.getNumberOfVotes);

module.exports = router;