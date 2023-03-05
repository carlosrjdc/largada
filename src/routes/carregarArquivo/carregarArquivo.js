const express = require("express");
const multer = require('multer');
const path = require('path');
const rodarApp = require("../../converter/index.js")
const fs = require("fs")
const uploadFile = require("../../converter/app.js")


const storage = multer.memoryStorage()
const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

const upload = multer({ storage,storage2 });

const path1 = path.resolve("uploads");


const router = express.Router();

router.post("/cadastro", upload.single('foto'), async (req, res) => {
    //uploadFile(req.file)
    rodarApp(req.file.buffer).then(data=> { 
        res.json(data)})})
    //const arquivo = fs.readFileSync(req.file.filename.b, "utf8")
    //console.log(arquivo)
    //res.json(req.file.fieldname)})

router.post("/rodar", async (req, res) => {
    //rodarArquivo("5c8b8a03bc51aebc7759b60a23588c84904b2370c99a04289221fe77df2a8fd63f7bf5c1aecd19a486cfc5481209934eeb8c2ad3830ff9d74bde3af852c02585.xlsx")
    res.json("OK")});
router.get("/cadastro", (req,res)=> {
    //wb.write('ArquivoExcel.xlsx', res)
});

module.exports = router;