const mongoose = require("mongoose");

const cadastroSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  telefone: { type: String, required: true },
  endereco: { type: String, required: true },
});

module.exports = mongoose.model("Cadastro", cadastroSchema);