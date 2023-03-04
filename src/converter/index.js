const excelToJson = require('convert-excel-to-json');
const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Worksheet Name');
const path = require('path');
const fs = require('fs');
const db = require("../../models");


const verescala = db.Escala;
 
async function escala(arquivo){


const result = await  excelToJson({
    sourceFile: arquivo,
    columnToKey:{
        A:"Empresa",
        B:"Id_Rota",
        C:"Transporte",
        D:"Local_Org",
        E:"Texto_adicional",
        F:"Placa",
        G:"Remessa",
        H:"Sequencia",
        I:"Cod_Cliente",
        J:"Cliente",
        K:"Cidade",
        L:"Bairro",
        M:"Peso",
        N: "Rua",
        O:"Valor",
        P:"Perfil_Rota",
        Q:"Perfil_Efetivo",
        R:"Cadastro_Sap",
        S:"Data_Saida_Mercador",
    },
    sheets:"base"
});

function agruparPor(objetoArray, propriedade) {
    return objetoArray.reduce(function (acc, obj) {
        let key = obj[propriedade];
        if (!acc[key]) {
          acc[key] = [];
          acc[key].push({
            N_rota:obj["Id_Rota"],
            Placa:"",
            Transporte:String(obj["Transporte"]),
            NF:agruparNota(obj["Id_Rota"], obj["Remessa"] ),
            Cliente:obj["Cliente"],
            Cidade:obj["Cidade"],
            Bairro:obj["Bairro"],
            QtdEntrega:String(contar(obj["Id_Rota"])),
            Reentrega:String(somarReentrega(obj["Id_Rota"],"Peso")),
            LDB:String(somar(obj["Id_Rota"],"4000", "Peso")),
            ITB:String(somar(obj["Id_Rota"],"3000", "Peso")),
        })

      }
      return acc

    }, {});
  }
function agruparNota (dado, nf){
let inicial = ""
const infoAgrupada = result.base.filter(filtrar=> filtrar["Id_Rota"] === dado).map(item => {
    const transString = String(item.Remessa)
    inicial = transString.length < 10 ? item.Remessa + " / " + inicial  : inicial
    })

    return inicial
}  

function somar(item, tipo, campo){
    const valorSoma = result.base.filter(filtrar=> filtrar.Id_Rota === item && String(filtrar.Empresa) === tipo).reduce((acc, valor)=> parseInt(acc) + parseInt(valor[campo]), 0)
    //console.log(valorSoma)
    return valorSoma
}

function somarReentrega(item,campo){
    const valorSoma = result.base.filter(filtrar=> filtrar.Id_Rota === item && String(filtrar.Remessa).length < 10 ).reduce((acc, valor)=> parseInt(acc) + parseInt(valor[campo]), 0)
    //console.log(valorSoma)
    return valorSoma
}

function contar(item){
    const valorSoma = result.base.filter(filtrar=> filtrar.Id_Rota===item).length
    return valorSoma
}

let escala = agruparPor(result.base, 'Id_Rota');

const novaEscala = Object.entries(escala)

const arraynovoFinal = novaEscala.reduce((acc, item)=> {
    acc.push(item[1][0])
    console.log(acc[0])

return acc},[])

arraynovoFinal.shift()

const headingColumnNames = [
    "N_rota",
    "Placa",
    "Transporte",
    "NF",
    "Cliente",
    "Cidade",
    "Bairro",
    "QtdEntrega",
    "Reentrega",
    "LDB",
    "ITB"
]

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
 
wb.write('uploads/ArquivoExcel.xlsx');

arraynovoFinal.map(item=>{
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
})


 
}

module.exports = escala
