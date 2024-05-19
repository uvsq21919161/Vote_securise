const express = require("express");
const router = express.Router();
const organisateurCtrl = require('../controle/OrganisateurCtr');

router.route("/add").post(organisateurCtrl.add);
router.route("/log").post(organisateurCtrl.log);

module.exports = router;