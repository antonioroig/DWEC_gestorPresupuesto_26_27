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
    divGasto.classList.add('gasto');

    const divDescripcion = document.createElement('div');
    divDescripcion.classList.add('gasto-descripcion');
    divDescripcion.textContent = gasto.descripcion;
    divGasto.append(divDescripcion);

    const divFecha = document.createElement('div');
    divFecha.classList.add('gasto-fecha');
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGasto.append(divFecha);

    const divValor = document.createElement('div');
    divValor.classList.add('gasto-valor');
    divValor.textContent = gasto.valor;
    divGasto.append(divValor);

    const divEtiquetas = document.createElement('div');
    divEtiquetas.classList.add('gasto-etiquetas');
    for (const etiqueta of gasto.etiquetas || []) {
        const span = document.createElement('span');
        span.classList.add('gasto-etiquetas-etiqueta');
        span.textContent = etiqueta;
        divEtiquetas.append(span);
    }
    divGasto.append(divEtiquetas);

    contenedor.append(divGasto);
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const contenedor = document.getElementById(idElemento);
    if (!contenedor) return;
    
    const nombrePeriodo = {mes : "mes", dia: "dia", año: "año"}

    const divAgrupacion = document.createElement('div');
    divAgrupacion.classList.add('agrupacion');
    document.body.append(divAgrupacion);

    const h1Titulo = document.createElement('h1');
    h1Titulo.textContent = 'Gastos agrupados por PERIODO';
    divAgrupacion.append(h1Titulo);

     for (const [clave, valor] of Object.entries(agrup)) {

        const divAgrupacionDato = document.createElement('div');
        divAgrupacionDato.classList.add('Agrupacion-Dato');
        divAgrupacion.append(divAgrupacionDato);

        const spanAgrupDatoClave = document.createElement('span');
        spanAgrupDatoClave.classList.add('agrupacion-dato-clave');
        spanAgrupDatoClave.textContent = clave;
        spanAgrupDatoClave.append(divAgrupacionDato);

        const spanAgrupDatoValor = document.createElement('span');
        spanAgrupDatoValor.classList.add('agrupacion-dato-valor');
        spanAgrupDatoValor.textContent = valor;
        spanAgrupDatoValor.append(divAgrupacionDato);
     }
}