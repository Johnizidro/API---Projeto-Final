// validations.js

function isText(value, minLength = 2) {
    return typeof value === 'string' && value.trim().length >= minLength;
  }
  
  function isExactDigits(value, length) {
    return typeof value === 'string' && /^\d+$/.test(value) && value.length === length;
  }
  
  function isDigits(value) {
    return typeof value === 'string' && /^\d+$/.test(value);
  }
  
  function isDate(value) {
    // Verifica formato YYYY-MM-DD e validade básica
    if (typeof value !== 'string') return false;
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(value)) return false;
  
    const date = new Date(value);
    return !isNaN(date.getTime());
  }
  
  // Validação do cliente
  function validateCliente(data) {
    const errors = [];
  
    if (!isText(data.nome)) {
      errors.push("Nome é obrigatório e deve ter pelo menos 2 caracteres.");
    }
  
    if (data.ocupacao && !isText(data.ocupacao)) {
      errors.push("Ocupação, se fornecida, deve ter pelo menos 2 caracteres.");
    }
  
    if (!isDate(data.dataNascimento)) {
      errors.push("Data de nascimento é obrigatória e deve estar no formato YYYY-MM-DD.");
    }
  
    if (data.telefone && !isExactDigits(data.telefone, 10) && !isExactDigits(data.telefone, 11)) {
      errors.push("Telefone, se fornecido, deve conter 10 ou 11 dígitos numéricos.");
    }
  
    if (data.cnpj && !isExactDigits(data.cnpj, 14)) {
      errors.push("CNPJ, se fornecido, deve conter 14 dígitos numéricos.");
    }
  
    if (data.cpf && !isExactDigits(data.cpf, 11)) {
      errors.push("CPF, se fornecido, deve conter 11 dígitos numéricos.");
    }
  
    return errors;
  }
  
  // Validação da fazenda
  function validateFazenda(data) {
    const errors = [];
  
    if (data.rua && !isText(data.rua)) {
      errors.push("Rua, se fornecida, deve ter pelo menos 2 caracteres.");
    }
  
    if (data.logradouro && !isText(data.logradouro)) {
      errors.push("Logradouro, se fornecido, deve ter pelo menos 2 caracteres.");
    }
  
    if (data.estado && !(typeof data.estado === 'string' && data.estado.length === 2)) {
      errors.push("Estado, se fornecido, deve ser a sigla de 2 caracteres.");
    }
  
    if (data.cidade && !isText(data.cidade)) {
      errors.push("Cidade, se fornecida, deve ter pelo menos 2 caracteres.");
    }
  
    if (data.numero && !isDigits(data.numero)) {
      errors.push("Número, se fornecido, deve conter apenas dígitos.");
    }
  
    if (data.cep && !isExactDigits(data.cep, 8)) {
      errors.push("CEP, se fornecido, deve conter 8 dígitos numéricos.");
    }
  
    // Campos numéricos opcionais que só aceitam dígitos
    const numericFields = ['comedouro', 'piquete', 'bebedouro', 'estoque', 'sensor', 'metros'];
    numericFields.forEach(field => {
      if (data[field] && !isDigits(data[field])) {
        errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)}, se fornecido, deve conter apenas dígitos.`);
      }
    });
  
    return errors;
  }
  
  module.exports = { validateCliente, validateFazenda };
  