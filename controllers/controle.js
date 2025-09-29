const saiService = require('../services/servico');

const fazerPergunta = async (req, res) => {
  const { pergunta } = req.body;

  if (!pergunta) {
    return res.status(400).json({ error: 'A pergunta é obrigatória.' });
  }

  try {
    const resposta = await saiService.executarTemplate(pergunta);
    res.json(resposta);
  } catch (error) {
    console.error('Erro no controller:', error);
    res.status(500).json({ error: 'Erro ao processar a pergunta.' });
  }
};

module.exports = {
  fazerPergunta,
};