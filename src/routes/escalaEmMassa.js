const express = require("express");
const escalaController = require("../../controllers/EscalaController.js");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.delete("/deletarescala", escalaController.deletarregistros);
router.post(
  "/uploadescalaemmassa",
  upload.single("arquivo"),
  escalaController.UploadEscala
);

module.exports = router;
