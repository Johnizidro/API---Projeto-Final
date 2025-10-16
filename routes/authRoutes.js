const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/mediadorCli");

const multer = require("multer");


const upload = multer({ storage: multer.memoryStorage() }); 


router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/me", authMiddleware ,authController.getUserData); 
router.put("/cliente",upload.single("imagem"), authMiddleware, authController.updateCliente);
router.put("/fazenda", authMiddleware,authController.updateFazenda);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

console.log("authRoutes carregado");

module.exports = router;