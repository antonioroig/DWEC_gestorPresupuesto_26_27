function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto){

    let elemento = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.textContent = gasto.descripcion;
    divGasto.append(divDescripcion);

    let divGastoFecha = document.createElement("div");
    divGastoFecha.className = "gasto-fecha";
    divGastoFecha.textContent = gasto.fecha;
    divGasto.append(divGastoFecha);

    let divGastoValor = document.createElement("div");
    divGastoValor.className = "gasto-valor";
    divGastoValor.textContent = gasto.valor;
    divGasto.append(divGastoValor);

    let divGastoEtiquetas = document.createElement("div");
    divGastoEtiquetas.className = "gasto-etiquetas";

    for(let etiqueta of gasto.etiquetas){

        let spanGastoEtiquetas = document.createElement("span");
        spanGastoEtiquetas.className = "gasto-etiquetas-etiqueta";
        spanGastoEtiquetas.textContent = etiqueta;
        divGastoEtiquetas.append(spanGastoEtiquetas);
    }

    divGasto.append(divGastoEtiquetas);
    elemento.append(divGasto);
}

function mostrarGastosAgrupadosWeb() {

}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}