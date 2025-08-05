const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  nome: String,
  dataNascimento: String,
  cnpj: String,
  cpf: String,
  telefone: String,
  ocupacao: String,
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
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' }  // Referência
})

const Fazenda = mongoose.model("Fazenda", fazendaSchema);

module.exports = { Cliente, Fazenda };
