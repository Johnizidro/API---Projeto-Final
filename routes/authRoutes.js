const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/mediadorCli");
const clienteMiddleware = require("../middlewares/userMiddleware");
const validarCadLog = require("../middlewares/CadLog")

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/register", validarCadLog, authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/me", authMiddleware, authController.getUserData);

// Autenticação antes do upload e validação
router.put("/cliente", authMiddleware, upload.single("imagem"), clienteMiddleware, authController.updateCliente);
router.put("/fazenda", authMiddleware, clienteMiddleware, authController.updateFazenda);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);

console.log("authRoutes carregado");

module.exports = router;
