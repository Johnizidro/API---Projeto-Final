const FaleConosco = require('../models/faleConoscoModel');

// Função para enviar a mensagem
const enviarMensagem = async (req, res) => {
  try {
    const { nomeCompleto, email, telefone, estado, cargo, mensagem } = req.body;

    const novaMensagem = new FaleConosco({
      nomeCompleto,
      email,
      telefone,
      estado,
      cargo,
      mensagem
    });

    await novaMensagem.save();

    res.status(201).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar mensagem:', error);
    res.status(500).json({ error: 'Erro ao enviar a mensagem.' });
  }
};

// Função para listar as mensagens
const listarMensagens = async (req, res) => {
  try {
    const mensagens = await FaleConosco.find();
    res.status(200).json(mensagens);
  } catch (error) {
    console.error('Erro ao listar mensagens:', error);
    res.status(500).json({ error: 'Erro ao listar mensagens.' });
  }
};

module.exports = { enviarMensagem, listarMensagens };
