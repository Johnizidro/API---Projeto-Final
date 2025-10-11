const Model = require("../models/modelos");
const mongoose = require('mongoose');


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



exports.deleteAnimal = async (req, res) => {
  try {
    const id = req.params.id;

    console.log("Tentando deletar animal com ID:", id);
    console.log("Usuário logado (req.userId):", req.userId);

    const animal = await Model.findOneAndDelete({
      _id: id,
      userId: new mongoose.Types.ObjectId(req.userId) // <- importante!
    });

    if (!animal) {
      return res.status(404).json({ message: 'Animal não encontrado ou acesso não autorizado.' });
    }

    return res.status(200).json({ message: 'Animal deletado com sucesso.' });

  } catch (error) {
    console.error("Erro ao deletar animal:", error.message);
    return res.status(500).json({ message: 'Erro interno ao deletar animal.', error: error.message });
  }
};

exports.updateAnimal = async (req, res) => {
  try {
    const id = req.params.id;

    // Dados enviados pelo front
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

    // Atualiza o animal pertencente ao usuário logado
    const animal = await Model.findOneAndUpdate(
      { _id: id, userId: req.userId },
      {
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
      },
      { new: true }
    );

    if (!animal) {
      return res.status(404).json({ message: 'Animal não encontrado ou acesso não autorizado.' });
    }

    res.status(200).json({ message: 'Animal atualizado com sucesso.', animal });

  } catch (error) {
    console.error("Erro ao atualizar animal:", error.message);
    res.status(500).json({ message: 'Erro ao atualizar animal.', error: error.message });
  }
};