const { validateCliente, validateFazenda } = require('../validations/user');

function validationMiddleware(req, res, next) {
    console.log("req.body na validação:", req.body);
    console.log("req.file na validação:", req.file);
    const path = req.path.toLowerCase();
    let errors = [];
  
    if (path.includes('cliente')) {
      errors = validateCliente(req.body);
  
      if (req.file) {
        const allowedTypes = ["image/jpeg", "image/png"];
        if (!allowedTypes.includes(req.file.mimetype)) {
          errors.push("Formato de imagem inválido. Apenas JPG e PNG são permitidos.");
        }
      }
    } else if (path.includes('fazenda')) {
      errors = validateFazenda(req.body);
    }
  
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
  
    next();
  }
  
module.exports = validationMiddleware;