function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto){
    let contenedor = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    let gastoDesc = document.createElement("div");
    gastoDesc.className = "gasto-descripcion";
    gastoDesc.textContent = gasto.descripcion;
    divGasto.append(gastoDesc);

    let gastoFecha = document.createElement("div");
    gastoFecha.className = "gasto-fecha";
    gastoFecha.textContent = new Date(gasto.fecha).toLocaleString();
    divGasto.append(gastoFecha);

    let gastoValor = document.createElement("div");
    gastoValor.className = "gasto-valor";
    gastoValor.textContent = gasto.valor;
    divGasto.append(gastoValor);

    let gastoEtiqueta = document.createElement("div");
    gastoEtiqueta.className = "gasto-etiquetas";
    for(let etiqueta of gasto.etiquetas){
        let etiquetaSpan = document.createElement("span");
        etiquetaSpan.className = "gasto-etiquetas-etiqueta";
        etiquetaSpan.textContent = etiqueta;
        gastoEtiqueta.append(etiquetaSpan);
    }
    divGasto.append(gastoEtiqueta);
    contenedor.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let contenedor = document.getElementById(idElemento);

    let textoPeriodo;
    if(periodo === "dia")
    {
        textoPeriodo = "día";
    }
    else if(periodo === "anyo"){
        textoPeriodo = "año";
    }
    else{
        textoPeriodo = "mes";
    }

    let divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";

    let h1 = document.createElement("h1");
    h1.textContent = "Gastos agrupados por " + textoPeriodo;
    divAgrupacion.append(h1);

    
    for(let clave in agrup){
        let valor = agrup[clave];

        let agrupDato = document.createElement("div");
        agrupDato.className = "agrupacion-dato";

        let agrupClave = document.createElement("span");
        agrupClave.className = "agrupacion-dato-clave";
        agrupClave.textContent = clave;
        agrupDato.append(agrupClave)

        let agrupValor = document.createElement("span");
        agrupValor.className = "agrupacion-dato-valor";
        agrupValor.textContent = valor;
        agrupDato.append(agrupValor);

        divAgrupacion.append(agrupDato);
    }
    contenedor.append(divAgrupacion);
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}