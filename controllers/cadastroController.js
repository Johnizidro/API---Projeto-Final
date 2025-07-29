const Cadastro = require("../models/cadastroModel");

exports.createCadastro = async (req, res) => {
  const { telefone, endereco } = req.body;

  if (!telefone || !endereco) {
    return res.status(422).json({ msg: "Telefone e endereço são obrigatórios" });
  }

  try {
    const cadastroExistente = await Cadastro.findOne({ userId: req.userId });
    if (cadastroExistente) {
      return res.status(422).json({ msg: "Cadastro já existe para este usuário" });
    }

    const cadastro = new Cadastro({
      userId: req.userId,
      telefone,
      endereco,
    });

    await cadastro.save();
    res.status(201).json({ msg: "Cadastro criado", cadastro });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.getCadastro = async (req, res) => {
  try {
    const cadastro = await Cadastro.findOne({ userId: req.userId });
    if (!cadastro) {
      return res.status(404).json({ msg: "Cadastro não encontrado" });
    }
    res.status(200).json(cadastro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro no servidor" });
  }
};
