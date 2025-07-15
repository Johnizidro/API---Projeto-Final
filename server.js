const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const model = require("../usuario/models/userModels");
const dotenv = require("dotenv");

const express = require("express");
require("./config/db");
dotenv.config();
const app = express();

const PORT = 3000;

app.use(express.json());

app.post("/auth/register", async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (!name) {
    return res.status(422).json({ msg: "O nome é obrigatório" });
  }
  if (!email) {
    return res.status(422).json({ msg: "O E-mail é obrigatório" });
  }
  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória" });
  }
  if (password != confPassword) {
    return res.status(422).json({ msg: "As senhas devem ser iguais" });
  }
  const userExist = await model.findOne({ email: email });

  if (userExist) {
    return res.status(422).json({ msg: "Usuário já existe" });
  }
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const User = new model({
    name,
    email,
    password: passwordHash,
  });
  try {
    await User.save();
    return res.status(201).json({ msg: "Usuário criado" });
  } catch (error) {
    return res.status(500).json({ msg: "Erro 500" });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ msg: "O E-mail é obrigatório" });
  }
  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória" });
  }

  const user = await model.findOne({ email: email });

  if (!user) {
    return res.status(422).json({ msg: "Cadastre o usuário" });
  }

  if (!user.password) {
    return res
      .status(500)
      .json({ msg: "Senha do usuário não encontrada no banco" });
  }

  try {
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(422).json({ msg: "Senha Incorreta" });
    }

    const secret = process.env.SECRET;
    const token = jwt.sign({ id: user._id }, secret);

    return res.status(201).json({ msg: "Autenticação Realizada", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Erro interno no servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).send("Bem Vindo à API!");
});
