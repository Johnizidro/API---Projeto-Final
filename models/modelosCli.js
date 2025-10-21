const mongoose = require("mongoose");

// =============================
// 📋 SCHEMA DO CLIENTE
// =============================
const clienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  dataNascimento: { type: String, required: true },
  cnpj: { type: String },
  cpf: { type: String },
  telefone: { type: String },
  ocupacao: { type: String },
  imagem: { type: Buffer }, // guarda o binário da imagem
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

const Cliente = mongoose.model("Cliente", clienteSchema);

// =============================
// 🐄 SCHEMA DA FAZENDA
// =============================
const fazendaSchema = new mongoose.Schema({
  cep: { type: String },
  rua: { type: String },
  logradouro: { type: String },
  numero: { type: String },
  estado: { type: String },
  cidade: { type: String },
  comedouro: { type: String },
  piquete: { type: String },
  bebedouro: { type: String },
  estoque: { type: String },
  sensor: { type: String },
  metros: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

const Fazenda = mongoose.model("Fazenda", fazendaSchema);

module.exports = { Cliente, Fazenda };
