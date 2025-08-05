const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
 console.log("Token recebido no header Authorization:", token);
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ msg: "Token não fornecido" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Token inválido" });

  try {
    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id; // garante que req.userId existe para o controller
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido ou expirado" });
  }
};