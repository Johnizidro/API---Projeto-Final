const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", true);

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@api.4dsqfhz.mongodb.net/?retryWrites=true&w=majority&appName=API`;

async function main() {
  try {
    await mongoose.connect(uri);
    console.log("Conectou o banco de dados!");
  } catch (error) {
    console.error("Erro ao conectar no banco:", error);
  }
}

main();

module.exports = main;