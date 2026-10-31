function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);
    elemento.textContent(valor);
}

function mostrarGastoWeb(idElemento, objetoGasto) {
    const elemento = document.getElementById(idElemento);

    const gasto = document.createElement("div");
    gasto.className = "gasto";

    const gastoDescripcion = document.createElement("div");
    gastoDescripcion.className = "gasto-descripcion";
    gastoDescripcion.textContent = objetoGasto.descripcion;
    gasto.append(gastoDescripcion);

    const gastoFecha = document.createElement("div");
    gastoFecha.className = "gasto-fecha";
    gastoFecha.textContent = objetoGasto.fecha;
    gasto.append(gastoFecha);

    const gastoValor = document.createElement("div");
    gastoValor.className = "gasto-valor";
    gastoValor.textContent = objetoGasto.valor;
    gasto.append(gastoValor);

    const gastoEtiquetas = document.createElement("div");
    gastoEtiquetas.className = "gasto-etiquetas";
    gasto.append(gastoEtiquetas);    
    
    for (const etiqueta of objetoGasto.etiquetas) {
        const gastoEtiquetasEtiqueta = document.createElement("span");
        gastoEtiquetasEtiqueta.className = "gasto-etiquetas-etiqueta";
        gastoEtiquetasEtiqueta.textContent = etiqueta;
        gastoEtiquetas.append(gastoEtiquetasEtiqueta);
    }    

    elemento.append(gasto);
}

function mostrarGastosAgrupadosEnId(idElemento, agrup, periodo) {
    const elemento = document.createElement(idElemento);

    
}

export {
    mostrarDatoEnId, 
    mostrarGastoWeb,
    mostrarGastosAgrupadosEnId
}