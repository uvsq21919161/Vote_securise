const express = require("express");
const router = express.Router();

const produitVotesCtrl = require('../controle/ProduitVotesCtrl');

router.route("/calc").post(produitVotesCtrl.calc);

module.exports = router;