const express = require('express');
const router = express.Router();
const perguntaController = require('../controllers/controle');

// POST /api/pergunta
router.post('/', perguntaController.fazerPergunta);

module.exports = router;