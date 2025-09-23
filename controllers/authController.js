const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { Cliente, Fazenda } = require("../models/modelosCli");
const transportador = require("../config/configEmail");
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

    const newUser = new User({
      name,
      email,
      telefone,
      password: passwordHash,
    });

    await newUser.save();

    // Enviar e-mail de boas-vindas
    const mailOptions = {
      from: `"ConectaBov" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Bem-vindo à nossa plataforma!",
      html: `
        <h2>Olá, ${name}!</h2>
        <p>Seu cadastro foi realizado com sucesso.</p>
        <p>Estamos felizes em tê-lo conosco.</p>
      `,
    };

    await transportador.sendMail(mailOptions);

    res.status(201).json({ msg: "Usuário criado com sucesso. E-mail enviado." });
  } catch (error) {
    console.error("Erro ao registrar usuário ou enviar e-mail:", error);
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
    if (!req.userId) {
      return res.status(401).json({ msg: "Token inválido ou ausente" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    const cliente = await Cliente.findOne({ userId: req.userId });
    if (!cliente) {
      return res.status(404).json({ msg: "Cliente não encontrado" });
    }

    const fazenda = await Fazenda.findOne({ userId: req.userId });

    const clienteData = cliente.toObject();

    // Converter a imagem do Binary para Base64
    if (clienteData.imagem && clienteData.imagem.buffer) {
      clienteData.imagem = clienteData.imagem.buffer.toString('base64');
    }

    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        telefone: user.telefone,
        createdAt: user.createdAt,
      },
      cliente: clienteData,
      fazenda: fazenda ? fazenda.toObject() : null
    });

  } catch (error) {
    console.error("Erro em getUserData:", error);
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const userId = req.userId;
    const cliente = await Cliente.findOne({ userId });

    if (!cliente) {
      return res.status(404).json({ msg: "Cliente não encontrado" });
    }

    await Cliente.updateOne({ userId }, req.body);
    res.json({ msg: "Cliente atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

// PUT Fazenda
exports.updateFazenda = async (req, res) => {
  try {
    const userId = req.userId;
    const fazenda = await Fazenda.findOne({ userId });

    if (!fazenda) {
      return res.status(404).json({ msg: "Fazenda não encontrada" });
    }

    await Fazenda.updateOne({ userId }, req.body);
    res.json({ msg: "Fazenda atualizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar fazenda:", error);
    res.status(500).json({ msg: "Erro no servidor" });
  }
};