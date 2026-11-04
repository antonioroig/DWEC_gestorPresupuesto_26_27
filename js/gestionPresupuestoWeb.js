function mostrarDatoEnId(idElemento, valor){
    const divMostarElemento = document.getElementById(idElemento);
    divMostarElemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto){
    const divMaestro = document.createElement("div");
    divMaestro.className = "gasto";
    document.getElementById(idElemento).append(divMaestro);
    const divDes = document.createElement("div");
    divDes.className = "gasto-descripcion";
    divDes.textContent = gasto.descripcion;
    divMaestro.append(divDes);
    const divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.textContent = gasto.fecha;
    divMaestro.append(divFecha);
    const divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.textContent = gasto.valor;
    divMaestro.append(divValor);
    const divEtiq = document.createElement("div");
    divEtiq.className = "gasto-etiquetas";
    for (let e of gasto.etiquetas){
        let span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";
        span.textContent = e + " ";     
        divEtiq.append(span); 
    }
    divMaestro.append(divEtiq);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    if (periodo === "anyo"){periodo = "año"};

    const divAgMaestro = document.getElementById(idElemento);
    const divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";
    divAgMaestro.append(divAgrupacion);
    const h1 = document.createElement("h1");
    h1.textContent = "Gastos agrupados por " + periodo;
    divAgrupacion.append(h1);

    for (let [clave, valor] of Object.entries(agrup)){
    const divAgDato = document.createElement("div");
    divAgDato.className = "agrupacion-dato";  
    const spanNom = document.createElement("span");
    spanNom.className = "agrupacion-dato-clave";
    spanNom.textContent = clave + ": ";
    const spanValor = document.createElement("span");
    spanValor.className = "agrupacion-dato-valor";
    spanValor.textContent = valor;
    divAgDato.append(spanNom, spanValor);  
    divAgrupacion.append(divAgDato);  
    }   
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}