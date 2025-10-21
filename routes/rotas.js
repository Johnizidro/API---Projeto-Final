const express = require("express");
const router = express.Router();
const controles = require("../controllers/controles");
const ModelSchema = require("../validations/validacao");
const validarEntrada = require("../middlewares/mediadorCli");
const validarAnimal = require("../middlewares/mediador");




router.post("/CadAni",validarEntrada, validarAnimal(ModelSchema), controles.create);
router.get('/listaAni', validarEntrada, controles.listByUser);
router.delete('/deletar/:id', validarEntrada, controles.deleteAnimal);
router.put('/editar/:id', validarEntrada,validarAnimal(ModelSchema), controles.updateAnimal);



module.exports = router;