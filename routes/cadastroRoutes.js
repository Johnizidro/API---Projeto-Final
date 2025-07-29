const express = require("express");
const router = express.Router();
const cadastroController = require("../controllers/cadastroController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/cadastro", authMiddleware, cadastroController.createCadastro);
router.get("/consulta", authMiddleware, cadastroController.getCadastro);

module.exports = router;