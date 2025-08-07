const Model = require("../models/modelos");

exports.create = async (req, res) => {
  try {
    // 🔒 Verifica se o usuário está autenticado (middleware já deve ter colocado req.userId)
    if (!req.userId) {
      return res.status(401).json({ message: "Token ausente ou inválido" });
    }

    const {
      codigoSisbov,
      nome,
      altura,
      peso,
      sexo,
      dataNascimento,
      pelagem,
      especie,
      raca,
      tipoProducao,
      producaoMensal
    } = req.body;

    // 👇 Inclui o userId no novo animal
    const novoAnimal = new Model({
      codigoSisbov,
      nome,
      altura,
      peso,
      sexo,
      dataNascimento,
      pelagem,
      especie,
      raca,
      tipoProducao,
      producaoMensal,
      userId: req.userId
    });

    await novoAnimal.save();

    return res.status(201).json({ message: 'Animal cadastrado com sucesso' });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Código Sisbov já cadastrado' });
    }
    return res.status(500).json({ message: 'Erro ao cadastrar', error: error.message });
  }
};

exports.listByUser = async (req, res) => {
  try {
    const animais = await Model.find({ userId: req.userId }).sort({ nome: 1 }); // ordena por nome
    res.json(animais);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar animais', error: error.message });
  }
};
