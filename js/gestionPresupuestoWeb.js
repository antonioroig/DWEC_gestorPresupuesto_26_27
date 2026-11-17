"use strict";

function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let p = document.createElement('p');
    p.textContent = valor;
    elemento.append(p);
}

function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.classList.add('gasto');

    let divDescripcion = document.createElement('div');
    divDescripcion.classList.add('gasto-descripcion');
    divDescripcion.textContent = gasto.descripcion;
    divGasto.append(divDescripcion);

    let divFecha = document.createElement('div');
    divFecha.classList.add('gasto-fecha');
    divFecha.textContent = new Date(gasto.fecha).toLocaleString();
    divGasto.append(divFecha);

    let divValor = document.createElement('div');
    divValor.classList.add('gasto-valor');
    divValor.textContent = gasto.valor;
    divGasto.append(divValor);

    let divEtiquetas = document.createElement('div');
    divEtiquetas.classList.add('gasto-etiquetas');
    gasto.etiquetas.forEach(etiqueta => {
        let span = document.createElement('span');
        span.classList.add('gasto-etiquetas-etiqueta');
        span.textContent = etiqueta;
        divEtiquetas.append(span);
    });
    divGasto.append(divEtiquetas);

    elemento.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let elemento = document.getElementById(idElemento);

    let divAgrupacion = document.createElement('div');
    divAgrupacion.classList.add('agrupacion');

    let nombresPeriodo = { dia: 'día', mes: 'mes', anyo: 'año' };

    let h1 = document.createElement('h1');
    h1.textContent = `Gastos agrupados por ${nombresPeriodo[periodo]}`;
    divAgrupacion.append(h1);

    Object.entries(agrup).forEach(([clave, valor]) => {
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
    });

    elemento.append(divAgrupacion);
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}