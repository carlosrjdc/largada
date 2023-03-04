
const functionAjuste = {

agruparNota:(array, dado, nf)=>{
let inicial = ""
const infoAgrupada = array.filter(filtrar=> filtrar["Id_Rota"] === dado).map(item => {
    const transString = String(item.Remessa)
    inicial = transString.length < 10 ? item.Remessa + " / " + inicial  : inicial
    })

    return inicial
}  ,

somar:(array, item, tipo, campo)=>{
    const valorSoma = array.filter(filtrar=> filtrar.Id_Rota === item && String(filtrar.Empresa) === tipo).reduce((acc, valor)=> parseInt(acc) + parseInt(valor[campo]), 0)
    //console.log(valorSoma)
    return valorSoma
},

somarReentrega:(array, item,campo)=>{
    const valorSoma = array.filter(filtrar=> filtrar.Id_Rota === item && String(filtrar.Remessa).length < 10 ).reduce((acc, valor)=> parseInt(acc) + parseInt(valor[campo]), 0)
    //console.log(valorSoma)
    return valorSoma
},

contar:(array, item)=>{
    const valorSoma = array.filter(filtrar=> filtrar.Id_Rota===item).length
    return valorSoma
}

}

module.exports = functionAjuste