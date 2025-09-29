const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);
const app = express();  // Primeiro define o app

app.use(cors());        // Depois usa o cors
app.use(express.json()); // Para parsear JSON no body das requisições

require("./config/db"); // conecta no banco

const authRoutes = require("./routes/authRoutes");
const tarefasRoutes = require("./routes/rotas");
const CliFazend = require("./routes/rotasCli");
const perguntaRoutes = require('./routes/rotasIA');


app.use("/auth", authRoutes);
app.use("/tarefas", tarefasRoutes);
app.use("/client", CliFazend);
app.use('/api/pergunta', perguntaRoutes);



app.get("/", (req, res) => {
  res.status(200).send("API funcionando");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

