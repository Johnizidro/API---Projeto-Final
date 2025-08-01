const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();  // Primeiro define o app

app.use(cors());        // Depois usa o cors
app.use(express.json()); // Para parsear JSON no body das requisições

require("./config/db"); // conecta no banco

const authRoutes = require("./routes/authRoutes");
const tarefasRoutes = require("./routes/rotas");


app.use("/auth", authRoutes, tarefasRoutes);


app.get("/", (req, res) => {
  res.status(200).send("API funcionando");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


