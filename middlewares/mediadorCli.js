// middleware de autenticação
module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: "Token ausente" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // ou decoded._id dependendo do token
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Token inválido" });
  }
};