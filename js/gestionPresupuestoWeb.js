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
        const span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";
        span.textContent = e;
        
    }
}