'use strict';

function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
}

function mostrarGastoWeb(idElemento, gasto) {
    const contenedor = document.getElementById(idElemento);
    if (!contenedor) {
        return;
    }

    const divGasto = document.createElement('div');
    divGasto.className = 'gasto';

    const divDescripcion = document.createElement('div');
    divDescripcion.className = 'gasto-descripcion';
    divDescripcion.textContent = gasto.descripcion;
    divGasto.append(divDescripcion);

    const divFecha = document.createElement('div');
    divFecha.className = 'gasto-fecha';
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGasto.append(divFecha);

    const divValor = document.createElement('div');
    divValor.className = 'gasto-valor';
    divValor.textContent = gasto.valor;
    divGasto.append(divValor);

    const divEtiquetas = document.createElement('div');
    divEtiquetas.className = 'gasto-etiquetas';
    for (const etiqueta of gasto.etiquetas || []) {
        const span = document.createElement('span');
        span.className = 'gasto-etiquetas-etiqueta';
        span.textContent = etiqueta;
        divEtiquetas.append(span);
    }
    divGasto.append(divEtiquetas);

    contenedor.append(divGasto);
}