const express = require("express");
const multer = require('multer');
const path = require('path');
const rodarArquivo = require("../../converter/index.js")
var xl = require('excel4node');
var wb = new xl.Workbook();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const extensaoArquivo = file.originalname.split('.')[1];

        // Cria um código randômico que será o nome do arquivo
        const novoNomeArquivo = require('crypto')
            .randomBytes(64)
            .toString('hex');

        // Indica o novo nome do arquivo:
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});

const upload = multer({ storage });

const path1 = path.resolve("uploads");


const router = express.Router();

router.post("/cadastro", upload.single('foto'), async (req, res) => {
    rodarArquivo("uploads/"+req.file.filename)
    console.log(req.file.path)
    res.json(req.file.fieldname)});

router.post("/rodar", async (req, res) => {
    rodarArquivo("5c8b8a03bc51aebc7759b60a23588c84904b2370c99a04289221fe77df2a8fd63f7bf5c1aecd19a486cfc5481209934eeb8c2ad3830ff9d74bde3af852c02585.xlsx")
    res.json("OK")});
router.get("/cadastro", (req,res)=> {
    wb.write('ArquivoExcel.xlsx', res)
});

module.exports = router;