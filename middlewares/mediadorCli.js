// middleware de autenticação
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  console.log("Token recebido no header Authorization:", token);

  if (!token) {
    return res.status(401).json({ msg: "Token ausente" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log de debug (apague em produção)
    console.log("Token decodificado:", decoded);

    // Compatível com id ou _id
    req.userId = decoded.id || decoded._id;

    // Se ainda não houver ID válido, retorna erro
    if (!req.userId) {
      return res.status(403).json({ msg: "Token malformado: ID não encontrado no payload" });
    }

    next();
  } catch (err) {
    console.error("Erro ao verificar o token:", err.message);
    return res.status(403).json({ msg: "Token inválido" });
  }
};
