const mongoose = require('mongoose');

const faleConoscoSchema = new mongoose.Schema({
  nomeCompleto: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
  estado: { type: String, required: true },
  cargo: { type: String, required: true },
  mensagem: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('FaleConosco', faleConoscoSchema);
