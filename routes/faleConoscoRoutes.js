const express = require('express');
const router = express.Router();
const FaleConosco = require('../models/faleConoscoModel');  // Modelo de mensagem
const { faleConoscoValidationRules, validate } = require('../validations/faleConoscoValidator');

// Lista de siglas de estados brasileiros para validar o estado no filtro
const estadosBrasileiros = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", 
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

// Rota para cadastrar uma mensagem
router.post('/', faleConoscoValidationRules, validate, async (req, res) => {
  try {
    const { nomeCompleto, email, telefone, estado, cargo, mensagem } = req.body;

    // Criação de um novo documento no MongoDB
    const novaMensagem = new FaleConosco({
      nomeCompleto,
      email,
      telefone,
      estado,
      cargo,
      mensagem,
    });

    // Salvando a mensagem no banco de dados
    await novaMensagem.save();

    // Retornando resposta para o cliente
    res.status(201).json({
      message: 'Mensagem enviada com sucesso!',
      data: novaMensagem,
    });
  } catch (error) {
    console.error('Erro ao salvar mensagem:', error);
    res.status(500).json({ error: 'Erro ao enviar a mensagem.' });
  }
});

// Rota para listar todas as mensagens com filtros
router.get('/tabela', async (req, res) => {
  try {
    const { nomeCompleto, estado, cargo, startDate, endDate } = req.query;

    // Criando um objeto de filtros
    let filters = {};

    // Filtro por nome completo (case insensitive)
    if (nomeCompleto) {
      filters.nomeCompleto = { $regex: nomeCompleto, $options: 'i' }; // Filtro por nome (case insensitive)
    }

    // Filtro por estado (com validação de sigla)
    if (estado) {
      if (estadosBrasileiros.includes(estado)) {
        filters.estado = estado;
      } else {
        return res.status(400).json({ error: 'Sigla de estado inválida. Use uma sigla válida.' });
      }
    }

    // Filtro por cargo
    if (cargo) {
      filters.cargo = { $regex: cargo, $options: 'i' }; // Filtro case insensitive para cargo
    }

    // Filtro por intervalo de datas
    if (startDate && endDate) {
      filters.createdAt = {
        $gte: new Date(startDate), // Data de início
        $lte: new Date(endDate)    // Data de fim
      };
    }

    // Buscar as mensagens com os filtros aplicados
    const mensagens = await FaleConosco.find(filters);

    // Retornar as mensagens filtradas
    res.status(200).json(mensagens);
  } catch (error) {
    console.error('Erro ao listar mensagens:', error);
    res.status(500).json({ error: 'Erro ao listar mensagens.' });
  }
});

module.exports = router;
