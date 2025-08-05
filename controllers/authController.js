const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { Cliente, Fazenda } = require("../models/modelosCli");
const dotenv = require("dotenv");
dotenv.config();

exports.registerUser = async (req, res) => {
  const { name, email, telefone, password, confPassword } = req.body;

  if (!name || !email || !telefone || !password || !confPassword) {
    return res.status(422).json({ msg: "Todos os campos são obrigatórios" });
  }

  if (password !== confPassword) {
    return res.status(422).json({ msg: "As senhas não conferem" });
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(422).json({ msg: "Usuário já existe" });

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, telefone, password: passwordHash });
    await newUser.save();

    res.status(201).json({ msg: "Usuário criado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ msg: "Email e senha são obrigatórios" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(422).json({ msg: "Usuário não encontrado" });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) return res.status(422).json({ msg: "Senha incorreta" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Token gerado:", token); 

    res.status(200).json({ msg: "Login efetuado", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.getUserData = async (req, res) => {
  try {
    // 1. Verifica se o userId foi extraído corretamente do token
    if (!req.userId) {
      return res.status(401).json({ msg: "Token inválido ou ausente" });
    }

    // 2. Busca o usuário (User) para dados como email e name
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    // 3. Busca o cliente associado ao userId
    const cliente = await Cliente.findOne({ userId: req.userId });
    if (!cliente) {
      return res.status(404).json({ msg: "Cliente não encontrado" });
    }

    // 4. Busca a fazenda associada ao cliente
    const fazenda = await Fazenda.findOne({ clienteId: cliente._id });

    // 5. Retorna todos os dados
    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        telefone: user.telefone,
        createdAt: user.createdAt,
      },
      cliente: cliente.toObject(),
      fazenda: fazenda ? fazenda.toObject() : null
    });

  } catch (error) {
    console.error("Erro em getUserData:", error);
    res.status(500).json({ msg: "Erro no servidor" });
  }
};
