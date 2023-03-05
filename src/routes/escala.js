
const express = require("express");
const largadaController = require("../../controllers/largadaController.js")

const router = express.Router();


router.delete("/deletar", largadaController.deletarregistros);


module.exports = router;