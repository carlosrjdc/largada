const express = require("express");
const estoqueController = require("../../controllers/estoqueController.js");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.delete("/deletarcontagem", estoqueController.deletarregistros);
router.get("/registroscontagem", estoqueController.carregarRegistros);
router.get(
  "/uploadcontagem",
  upload.single("arquivo"),
  estoqueController.UploadContagem
);

module.exports = router;
