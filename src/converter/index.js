const excelToJson = require("convert-excel-to-json");
const path = require("path");
const fs = require("fs");
const db = require("../../models");
const infoDados = require("./dados.json");
const colunas = require("./colunas.js");
const functionAjuste = require("./functionAjuste.js");
const uploadFile = require("./app.js");
const { response } = require("express");
const xlxs = require("xlsx");

const verescala = db.Escala;

async function rodarApp(arquivo) {
  const result = await excelToJson({
    source: arquivo,
    columnToKey: infoDados,
    sheets: "base",
  });

  function agruparPor(objetoArray, propriedade) {
    const resultadoFinal = [];
    return objetoArray.reduce(function (acc, obj) {
      let key = obj[propriedade];
      if (!acc[key]) {
        acc[key] = [];
        acc[key].push({
          N_rota: obj["Id_Rota"],
          Placa: obj["Placa"],
          Transporte: String(obj["Transporte"]),
          NF: functionAjuste.agruparNota(
            result.base,
            obj["Id_Rota"],
            obj["Remessa"]
          ),
          Cliente: obj["Cliente"],
          Cidade: obj["Cidade"],
          Bairro: obj["Bairro"],
          QtdEntrega: String(
            functionAjuste.contar(result.base, obj["Id_Rota"])
          ),
          Reentrega: String(
            functionAjuste.somarReentrega(result.base, obj["Id_Rota"], "Peso")
          ),
          LDB: String(
            functionAjuste.somar(result.base, obj["Id_Rota"], "4000", "Peso")
          ),
          ITB: String(
            functionAjuste.somar(result.base, obj["Id_Rota"], "3000", "Peso")
          ),
        });
      }
      return acc;
    }, {});
  }

  let escala = agruparPor(result.base, "Id_Rota");

  const novaEscala = Object.entries(escala);

  const arraynovoFinal = novaEscala.reduce((acc, item) => {
    acc.push(item[1][0]);
    return acc;
  }, []);

  arraynovoFinal.shift();

  arraynovoFinal.map(async (item) => {
    const validar = await verescala.count({
      where: {
        NRota: item.N_rota,
      },
    });

    if (validar < 1) {
      const input = await verescala.create({
        NRota: item.N_rota,
        Placa: item.Placa,
        Transporte: item.Transporte,
        Nf: item.NF,
        Cliente: item.Cliente,
        Cidade: item.Cidade,
        Bairro: item.Bairro,
        Qtdentregas: item.QtdEntrega,
        Reentrega: item.Reentrega,
        LDB: item.LDB,
        ITB: item.ITB,
      });
    }
  });

  return arraynovoFinal;
}

module.exports = rodarApp;
