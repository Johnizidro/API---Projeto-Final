const express = require("express");
const router = express.Router();
const controles = require("../controllers/controles");
const ModelSchema = require("../validations/validacao");
const validarEntrada = require("../middlewares/mediadorCli");




router.post("/CadAni",validarEntrada, controles.create);
router.get('/listaAni', validarEntrada, controles.listByUser);
router.delete('/deletar/:id', validarEntrada, controles.deleteAnimal);



module.exports = router;