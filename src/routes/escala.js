
const express = require("express");
const largadaController = require("../../controllers/largadaController.js")

const router = express.Router();


router.delete("/deletar", largadaController.deletarregistros);
router.put("/atualizar", largadaController.atualizarDados);
router.get("/registros", largadaController.buscarRegistros);


module.exports = router;