const { Cliente, Fazenda } = require("../models/modelosCli");

// Função para cadastrar cliente
const cadastrarCliente = async (req, res) => {
  try {
    console.log("🔍 Dados recebidos no body:", req.body); // ← aqui!
    const novoCliente = new Cliente(req.body);
    await novoCliente.save();
    res.status(201).json({ mensagem: "Cliente cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao cadastrar cliente." });
  }
};


// Função para cadastrar fazenda
const cadastrarFazenda = async (req, res) => {
  try {
    const novaFazenda = new Fazenda(req.body);
    await novaFazenda.save();
    res.status(201).json({ mensagem: "Fazenda cadastrada com sucesso!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao cadastrar fazenda." });
  }
};

// Exportar as duas funções
module.exports = {
  cadastrarCliente,
  cadastrarFazenda
};
