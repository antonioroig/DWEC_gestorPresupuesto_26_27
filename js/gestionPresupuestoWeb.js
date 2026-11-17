'use strict';

import * as gp from "./gestionPresupuesto.js";

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
    const elemento = document.getElementById(idElemento);

    const divAgrupacion = document.createElement('div');
    divAgrupacion.setAttribute('class', 'agrupacion');
    elemento.append(divAgrupacion);

    let mensaje = ""
    if (periodo === "dia")
    {
        mensaje = "Gastos agrupados por día";
    }
    else if (periodo === "anyo")
    {
        mensaje = "Gastos agrupados por año";
    }
    else
    {
        mensaje = "Gastos agrupados por mes";
    }

    const h1 = document.createElement('h1');
    h1.textContent = mensaje;
    divAgrupacion.append(h1);

    for (let [clave, valor] of Object.entries(agrup))
    {
        const divAgrupacionDato = document.createElement('div');
        divAgrupacionDato.setAttribute('class', 'agrupacion-dato');
        divAgrupacion.append(divAgrupacionDato);

        const spanAgrupacionClave = document.createElement('span');
        spanAgrupacionClave.setAttribute('class', 'agrupacion-dato-clave')
        spanAgrupacionClave.textContent = clave + ": ";
        divAgrupacionDato.append(spanAgrupacionClave);

       
        const spanAgrupacionValor = document.createElement('span');
        spanAgrupacionValor.setAttribute('class', 'agrupacion-dato-valor')
        spanAgrupacionValor.textContent = valor;
        divAgrupacionDato.append(spanAgrupacionValor);
    }
}
export{
    mostrarDatoEnId,
    mostrarGastosAgrupadosWeb,
    mostrarGastoWeb
}