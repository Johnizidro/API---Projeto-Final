const express = require("express");
const controles = require("../controllers/controlesCli");
const logMiddleware = require("../middlewares/mediadorCli");
const multer = require("multer");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // guarda em memória

// Cadastro de Cliente com imagem
router.post(
  "/cliente",
  logMiddleware,
  upload.single("imagem"), // o "name" do input do arquivo deve ser 'imagem'
  controles.cadastrarCliente
);

// Cadastro de Fazenda
router.post(
  "/fazenda",
  logMiddleware,
  controles.cadastrarFazenda
);

module.exports = router;