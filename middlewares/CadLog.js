// mediadorUser.js
const userValidator = require("../validations/CadLog");

module.exports = (req, res, next) => {
  const { error } = userValidator.validate(req.body, { abortEarly: false });

  if (error) {
    const mensagens = error.details.map((err) => err.message);
    console.log("Erros de validação:", mensagens);  // Log para depuração
    return res.status(400).json({ erros: mensagens });
  }

  next();
};
