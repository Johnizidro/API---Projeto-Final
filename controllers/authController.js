const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { Cliente, Fazenda } = require('../models/modelosCli');
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

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ msg: "Login efetuado", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.userId);
    if (!cliente) return res.status(404).json({ msg: "Cliente não encontrado" });

    const fazenda = await Fazenda.findOne({ /* algum filtro que faça sentido */ });

    res.status(200).json({ ...cliente.toObject(), fazenda: fazenda ? fazenda.toObject() : null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro no servidor" });
  }
};