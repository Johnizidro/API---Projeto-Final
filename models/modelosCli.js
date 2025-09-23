const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  nome: String,
  dataNascimento: String,
  cnpj: String,
  cpf: String,
  telefone: String,
  ocupacao: String,
  imagem: Buffer, // NOVO CAMPO PARA IMAGEM
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Cliente = mongoose.model("Cliente", clienteSchema);

const fazendaSchema = new mongoose.Schema({
  cep: String,
  rua: String,
  logradouro: String,
  numero: String,
  estado: String,
  cidade: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Fazenda = mongoose.model("Fazenda", fazendaSchema);

module.exports = { Cliente, Fazenda };