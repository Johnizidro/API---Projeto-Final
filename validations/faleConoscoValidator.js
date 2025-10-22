// validations/faleConoscoValidator.js
const { body, validationResult } = require('express-validator');

// Definindo as regras de validação
const faleConoscoValidationRules = [
  body('nomeCompleto').trim().notEmpty().withMessage('Nome completo é obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('telefone').trim().notEmpty().withMessage('Telefone é obrigatório'),
  body('estado').trim().notEmpty().withMessage('Estado é obrigatório'),
  body('cargo').trim().notEmpty().withMessage('Cargo é obrigatório'),
  body('mensagem').trim().notEmpty().withMessage('Mensagem é obrigatória'),
];

// Função para validar e capturar erros
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  faleConoscoValidationRules,
  validate,
};
