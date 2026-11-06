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

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo ) {

    let divAgrupacion = document.createElement("div");
    divAgrupacion.classList.add("agrupacion");

    let h1 = document.createElement("h1");
    h1.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.append(h1);

    for (var [key, value] of Object.entries(agrup)) {
        
        let divagrup = document.createElement("div");
        divagrup.classList.add("agrupacion-dato");

        let span1 = document.createElement("span");
        span1.classList.add("agrupacion-dato-clave");
        span1.textContent = key + ":   ";

        let span2 = document.createElement("span");
        span2.classList.add("agrupacion-dato-valor");
        span2.textContent = value.toFixed(2);

        divagrup.append(span1);
        divagrup.append(span2);
        divAgrupacion.append(divagrup);
    }

    document.getElementById(idElemento).append(divAgrupacion);
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}