const express = require("express");
const controles = require("../controllers/controlesCli");
const { fazendaSchema, clienteSchema, validarComSchema } = require("../validations/validacaoCli");
const logMiddleware = require("../middlewares/mediadorCli");

const router = express.Router();

// Cadastro de Fazenda
router.post(
    "/fazenda",
    logMiddleware,
    validarComSchema(fazendaSchema),
    controles.cadastrarFazenda
  );
  
  // Cadastro de Cliente
  router.post(
    "/cliente",
    logMiddleware,
    validarComSchema(clienteSchema),
    controles.cadastrarCliente
  );
  
module.exports = router;
