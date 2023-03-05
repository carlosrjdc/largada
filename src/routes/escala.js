
const express = require("express");
const largadaController = require("../../controllers/largadaController.js")

const router = express.Router();


router.delete("/deletar", largadaController.deletarregistros);
router.put("/atualizar/:id", largadaController.atualizarDados);
router.get("/registros", largadaController.buscarRegistros);
router.get("/dash", largadaController.estatistica);


module.exports = router;