'use strict';

function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
}

function mostrarGastoWeb(idElemento, gasto) {
    let contenedor = document.getElementById(idElemento);
    if (!contenedor) return;

    let divGasto = document.createElement('div');
    divGasto.classList.add('gasto');

    let divDesc = document.createElement('div');
    divDesc.classList.add('gasto-descripcion');
    divDesc.textContent = gasto.descripcion;

    let divFecha = document.createElement('div');
    divFecha.classList.add('gasto-fecha');
    divFecha.textContent = new Date(gasto.fecha).toLocaleString();

    let divValor = document.createElement('div');
    divValor.classList.add('gasto-valor');
    divValor.textContent = gasto.valor;

    let divEtiquetas = document.createElement('div');
    divEtiquetas.classList.add('gasto-etiquetas');

    for (let etiqueta of gasto.etiquetas) {
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.classList.add('gasto-etiquetas-etiqueta');
        spanEtiqueta.textContent = etiqueta;
        divEtiquetas.append(spanEtiqueta);
    }

    divGasto.append(divDesc, divFecha, divValor, divEtiquetas);
    contenedor.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let contenedor = document.getElementById(idElemento);
    if (!contenedor) return;

    let divAgrupacion = document.createElement('div');
    divAgrupacion.classList.add('agrupacion');

    let h1 = document.createElement('h1');
    let textoPeriodo = periodo;
    if (periodo === 'dia') {
        textoPeriodo = 'día';
    } else if (periodo === 'anyo') {
        textoPeriodo = 'año';
    }
    h1.textContent = `Gastos agrupados por ${textoPeriodo}`;
    divAgrupacion.append(h1);

    for (let [clave, valor] of Object.entries(agrup)) {
        let divDato = document.createElement('div');
        divDato.classList.add('agrupacion-dato');

        let spanClave = document.createElement('span');
        spanClave.classList.add('agrupacion-dato-clave');
        spanClave.textContent = clave;

        let spanValor = document.createElement('span');
        spanValor.classList.add('agrupacion-dato-valor');
        spanValor.textContent = valor;

        divDato.append(spanClave, spanValor);
        divAgrupacion.append(divDato);
    }

    contenedor.append(divAgrupacion);
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};