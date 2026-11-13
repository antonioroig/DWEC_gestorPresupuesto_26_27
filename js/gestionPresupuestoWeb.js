function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).textContent = valor
}
function mostrarGastoWeb(idElemento, gasto) {
    let gastoPadre = document.createElement("div");
    gastoPadre.className = "gasto";

    let gastoHijo = document.createElement("div");
    gastoHijo.className = "gasto-descripcion";
    gastoHijo.textContent = gasto.descripcion;
    gastoPadre.append(gastoHijo);

    let gastoHijo2 = document.createElement("div");
    gastoHijo2.className = "gasto-fecha";
    gastoHijo2.textContent = gasto.fecha;
    gastoPadre.append(gastoHijo2);

    let gastoHijo3 = document.createElement("div");
    gastoHijo3.className = "gasto-valor";
    gastoHijo3.textContent = gasto.valor;
    gastoPadre.append(gastoHijo3);

    let gastoHijo4 = document.createElement("div");
    gastoHijo4.className = "gasto-etiquetas";
    gastoPadre.append(gastoHijo4);

    for (let etiqueta of gasto.etiquetas) { 
        let etiqueta1 = document.createElement("span");
        etiqueta1.className = "gasto-etiquetas-etiqueta";
        etiqueta1.textContent = etiqueta;
        gastoHijo4.append(etiqueta1);
    }

    let id = document.getElementById(idElemento);
    if (id) {
        id.append(gastoPadre);
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let agrupPadre = document.createElement("div")
    agrupPadre.className = "agrupacion"
    
    let textoPeriodo = periodo
    if(periodo === 'dia'){
        textoPeriodo = 'día'
    }
    if(periodo === 'anyo'){
        textoPeriodo = 'año'
    }
    
    let encabezado = document.createElement("h1")
    encabezado.textContent = `Gastos agrupados por ${textoPeriodo}`
    agrupPadre.append(encabezado)

    for(let [clave,valor] of Object.entries(agrup)){
        let agrupHijo1 = document.createElement("div")
        agrupHijo1.className = "agrupacion-dato"

        let agrupHijo2 = document.createElement("span")
        agrupHijo2.className = "agrupacion-dato-clave"
        agrupHijo2.textContent = clave
        agrupHijo1.append(agrupHijo2)

        let agrupHijo3 = document.createElement("span")
        agrupHijo3.className = "agrupacion-dato-valor"
        agrupHijo3.textContent = valor.toFixed(2)
        agrupHijo1.append(agrupHijo3)

        agrupPadre.append(agrupHijo1);
    }
    let id = document.getElementById(idElemento);
    if (id) {
        id.append(agrupPadre);
    }
} 
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}