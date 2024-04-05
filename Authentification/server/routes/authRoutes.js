// Imports
const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  loginUser,
  getProfile,
  generateCode,
} = require("../controle/controleacces");

// Paramétrage du serveur, pour l'instant en local
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Modules pour les routes, endpoints
router.post("/login", loginUser);
router.post("/disconnect", (req, res) => {
  res.clearCookie("token");
  return res.json(null);
});
router
router.post('/generate', generateCode);

// Export
module.exports = router;
