'use strict';
function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}
function mostrarGastoWeb(idElemento, gasto){
    let contenedor = document.getElementById(idElemento);

    let divGasto = document.createAttribute('div');
    divGasto.className = 'gasto';

    let divDescripcion = document.createAttribute('div');
    divDescripcion.className = 'gasto-descripcion';
    divDescripcion.textContent = gasto.descripcion;
    divGasto.appendChild(divDescripcion);
    
    let divFecha = document.createAttribute('div');
    divFecha.className = 'gasto-fecha';
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGasto.appendChild(divFecha);

    let divValor = document.createAttribute('div');
    divValor.className = 'gasto-valor';
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    let divEtiquetas = document.createAttribute('div');
    divEtiquetas.className = 'gasto-etiquetas';
    for (let etiqueta of gasto.etiquetas){
        let span = document.createElement('span');
        span.className = 'gasto-etiquetas-etiqueta';
        span.textContent = etiqueta;
        divEtiquetas.appendChild(span);
    }
    divGasto.appendChild(divEtiquetas);

    contenedor.appendChild(divGasto);
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    
}
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}