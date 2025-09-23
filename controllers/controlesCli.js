const { Cliente, Fazenda } = require("../models/modelosCli");

// Cadastrar Cliente
const cadastrarCliente = async (req, res) => {
  try {
    console.log("🔍 Dados recebidos no body:", req.body);
    console.log("👤 ID do usuário autenticado:", req.userId);

    const novoCliente = new Cliente({
      ...req.body,
      userId: req.userId
    });

    // Salvar imagem se houver
    if (req.file) {
      novoCliente.imagem = req.file.buffer;
    }

    await novoCliente.save();
    res.status(201).json({ mensagem: "Cliente cadastrado com sucesso!" });
  } catch (error) {
    console.error("❌ Erro ao cadastrar cliente:", error);
    res.status(500).json({ erro: "Erro ao cadastrar cliente." });
  }
};

// Cadastrar Fazenda
const cadastrarFazenda = async (req, res) => {
  try {
    console.log("📦 Dados recebidos:", req.body);
    console.log("👤 ID do usuário autenticado:", req.userId);

    const novaFazenda = new Fazenda({
      ...req.body,
      userId: req.userId
    });

    await novaFazenda.save();
    res.status(201).json({ mensagem: "Fazenda cadastrada com sucesso!" });
  } catch (error) {
    console.error("❌ Erro ao cadastrar fazenda:", error);
    res.status(500).json({ erro: "Erro ao cadastrar fazenda." });
  }
};

module.exports = {
  cadastrarCliente,
  cadastrarFazenda
};