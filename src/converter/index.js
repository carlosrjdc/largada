const excelToJson = require('convert-excel-to-json');
const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Worksheet Name');
const path = require('path');
const fs = require('fs');
const db = require("../../models");
const infoDados = require("./dados.json")
const colunas = require("./colunas.js")
const functionAjuste = require("./functionAjuste.js")
const uploadFile = require("./app.js")


const verescala = db.Escala;
 
async function rodarApp(arquivo, nomeFinalArquivo){


const result = await  excelToJson({
    source: arquivo,
    columnToKey:infoDados,
    sheets:"base"
});

function agruparPor(objetoArray, propriedade){
    const resultadoFinal = []
    return objetoArray.reduce(function (acc, obj) {
        let key = obj[propriedade];
        if (!acc[key]) {
          acc[key] = [];
          acc[key].push({
            N_rota:obj["Id_Rota"],
            Placa:"",
            Transporte:String(obj["Transporte"]),
            NF:functionAjuste.agruparNota(result.base,obj["Id_Rota"], obj["Remessa"] ),
            Cliente:obj["Cliente"],
            Cidade:obj["Cidade"],
            Bairro:obj["Bairro"],
            QtdEntrega:String(functionAjuste.contar(result.base,obj["Id_Rota"])),
            Reentrega:String(functionAjuste.somarReentrega(result.base,obj["Id_Rota"],"Peso")),
            LDB:String(functionAjuste.somar(result.base,obj["Id_Rota"],"4000", "Peso")),
            ITB:String(functionAjuste.somar(result.base,obj["Id_Rota"],"3000", "Peso")),
        })

      }
      return acc

    }, {});
  }

let escala = agruparPor(result.base, 'Id_Rota');

const novaEscala = Object.entries(escala)

const arraynovoFinal = novaEscala.reduce((acc, item)=> {
    acc.push(item[1][0])

return acc},[])

arraynovoFinal.shift()

const headingColumnNames = colunas
let headingColumnIndex = 1; //diz que começará na primeira linha
headingColumnNames.forEach(heading => { //passa por todos itens do array
    // cria uma célula do tipo string para cada título
    ws.cell(1, headingColumnIndex++).string(heading);
});
 
let rowIndex = 2;
arraynovoFinal.forEach( record => {
    let columnIndex = 1;
    Object.keys(record).forEach(columnName =>{
        ws.cell(rowIndex,columnIndex++)
            .string(record [columnName])
    });
    rowIndex++;
}); 
 

/*arraynovoFinal.map(item=>{
    item.QtdEntrega = parseInt(item.QtdEntrega)
    item.Reentrega = parseInt(item.Reentrega)
    item.LDB = parseInt(item.LDB)
    item.ITB = parseInt(item.ITB)
    item.Transporte = parseInt(item.Transporte)
    verescala.create({
        NRota:item.N_rota,
        Transporte: item.Transporte,
        Nf: item.NF,
        Cliente:item.Cliente,
        Cidade:item.Cidade,
        Bairro:item.Bairro,
        Qtdentregas: item.QtdEntrega,
        Reentrega: item.Reentrega,
        LDB: item.LDB,
        ITB: item.ITB
    })
})*/

let info = ""
await uploadFile(wb.write('opa.xlsx'),nomeFinalArquivo).then(data=> {info = data})
return info
 
}

module.exports = rodarApp
