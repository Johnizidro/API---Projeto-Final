const express = require("express");
const controles = require("../controllers/controles");
const ModelSchema = require("../validations/validacao");
const validarEntrada = require("../middlewares/mediador");

const router = express.Router();


router.post("/CadAni",validarEntrada(ModelSchema), controles.create);



module.exports = router;