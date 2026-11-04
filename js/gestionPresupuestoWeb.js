function mostarDatoEnId(id, valor){
    document.getElementById(id).textContent = valor;
}

function mostrarGastosWeb(idElemento, gasto){
    let contenedor = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    let gastoDesc = document.createElement("div");
    gastoDesc.className = "gasto-descripcion";
    gastoDesc.textContent = gasto.descripcion;
    divGasto.append(gastoDesc);

    let gastoFecha = document.createElement("div");
    gastoFecha.className = "gasto-fecha";
    gastoFecha.textContent = gasto.fecha;
    gastoDiv.append(gastoFecha);

    let gastoValor = document.createElement("div");
    gastoValor.className = "gasto-valor";
    gastoValor.textContent = gasto.valor;
    gastoDiv.append(gastoValor);

    let gastoEtiqueta = document.createElement("div");
    gastoEtiqueta.className("gasto-etiquetas");
    for(let etiqueta of gasto.etiquetas){
        let etiquetaSpan = document.createElement("span");
        etiquetaSpan.className("gasto-etiquetas-etiqueta");
        etiquetaSpan.textContent = etiqueta;
        gastoEtiqueta.append(etiquetaSpan);
    }
    gastoDiv.append(gastoEtiqueta);
    contenedor.append(gastoDiv);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let contenedor = document.getElementById(idElemento);

    if(periodo === "dia")
    {
        periodo.textContent = "día";
    }
    else if(periodo === "anyo"){
        periodo.textContent = "año";
    }
    else{
        periodo.textContent = "mes";
    }



    let divAgrupacion = document.createElement("div");
    divAgrupacion.className("agrupacion");

    let h1 = document.createElement("h1");
    h1.textContent = "Gastos agrupados por " + periodo.textContent;

    let agruparDato = document.createElement("div");
    agruparDato.className("agrupacion-dato")
    divAgrupacion.append(agruparDato);

    let datoClave = document.createElement("span")
    datoClave.className("agrupacion-dato-clave")
    datoClave.textContent = agrup.nombre;
}

export{
    mostarDatoEnId,
    mostrarGastosWeb,
    mostrarGastosAgrupadosWeb
}