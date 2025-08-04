const yup = require("yup");

const fazendaSchema = yup.object({
  cep: yup.string().required(),
  rua: yup.string().required(),
  logradouro: yup.string().required(),
  numero: yup.string().required(),
  estado: yup.string().required(),
  cidade: yup.string().required()
});

const clienteSchema = yup.object({
  nome: yup.string().required("Nome é obrigatório"),
  dataNascimento: yup.string().required("Data de nascimento é obrigatória"),
  cnpj: yup.string(),
  cpf: yup.string(),
  telefone: yup.string()

});

function validarComSchema(schema) {
  return async (req, res, next) => {
    try {
      req.body = await schema.validate(req.body, { stripUnknown: true });
      next();
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  };
}

module.exports = {
  fazendaSchema,
  clienteSchema,
  validarComSchema
};
