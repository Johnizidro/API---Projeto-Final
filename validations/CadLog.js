const Joi = require("joi");

const userValidator = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "Nome deve ser um texto",
    "string.empty": "Nome é obrigatório",
    "string.min": "Nome deve ter pelo menos 3 caracteres",
    "string.max": "Nome deve ter no máximo 50 caracteres",
    "any.required": "Nome é obrigatório",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "Email deve ser um texto",
    "string.email": "Email deve ser válido",
    "string.empty": "Email é obrigatório",
    "any.required": "Email é obrigatório",
  }),

  telefone: Joi.string()
    .pattern(/^\+?\d{10,15}$/)
    .required()
    .messages({
      "string.base": "Telefone deve ser um texto",
      "string.empty": "Telefone é obrigatório",
      "string.pattern.base": "Telefone deve conter entre 10 a 15 dígitos e pode conter o '+' no início",
      "any.required": "Telefone é obrigatório",
    }),

  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};:"\\\\|,.<>/?]).{8,}$'))
    .required()
    .messages({
      "string.pattern.base": "Senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial",
      "string.empty": "Senha é obrigatória",
      "any.required": "Senha é obrigatória",
    }),

  confPassword: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Confirmação de senha deve ser igual à senha',
      'any.required': 'Confirmação de senha é obrigatória',
    }),
});

module.exports = userValidator;
