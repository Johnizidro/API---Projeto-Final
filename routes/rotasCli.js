const express = require("express");
const controles = require("../controllers/controlesCli");
const logMiddleware = require("../middlewares/mediadorCli");
const validationMiddleware = require("../middlewares/userMiddleware");
const multer = require("multer");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // guarda em memória

// Cadastro de Cliente com imagem e validação
router.post(
  "/cliente",
  logMiddleware,
  upload.single("imagem"), // o "name" do input do arquivo deve ser 'imagem'
  validationMiddleware,
  controles.cadastrarCliente
);

// Cadastro de Fazenda com validação
router.post(
  "/fazenda",
  logMiddleware,
  validationMiddleware,
  controles.cadastrarFazenda
);

module.exports = router;