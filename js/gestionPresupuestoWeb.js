'use strict';

import * as presupuestoLogica from './gestionPresupuesto.js';

function repintar() {
    //Mostrar presupuesto
    mostrarDatoEnId('presupuesto', presupuestoLogica.mostrarPresupuesto());

    //Mostrar gastos totales
    mostrarDatoEnId('gastos-totales', presupuestoLogica.calcularTotalGastos());

    //Mostrar balance total
    mostrarDatoEnId('balance-total', presupuestoLogica.calcularBalance());

    //Borrar el contenido de div#listado-gastos-completo
    let divListado = document.getElementById('listado-gastos-completo');
    if (divListado) {
        divListado.innerHTML = '';
    }

    //Volver a pintar el listado completo de gastos
    let listaGastos = presupuestoLogica.listarGastos();
    for (let gasto of listaGastos) {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    }
}

function actualizarPresupuestoWeb() {
    let entrada = prompt("Introduce el nuevo presupuesto:");
    if (entrada !== null) {
        let nuevoPresupuesto = Number(entrada);
        presupuestoLogica.actualizarPresupuesto(nuevoPresupuesto);
        repintar();
    }
}

function nuevoGastoWeb() {
    let descripcion = prompt("Introduce la descripción del gasto:");
    let valorStr = prompt("Introduce el valor del gasto:");
    let fecha = prompt("Introduce la fecha del gasto (yyyy-mm-dd):");
    let etiquetasStr = prompt("Introduce las etiquetas separadas por comas:");

    let valor = Number(valorStr);
    let etiquetas = etiquetasStr ? etiquetasStr.split(',').map(e => e.trim()) : [];

    let nuevoGasto = new presupuestoLogica.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    presupuestoLogica.anyadirGasto(nuevoGasto);
    repintar();
}

// Registro de eventos en los botones principales
let btnActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
if (btnActualizarPresupuesto) {
    btnActualizarPresupuesto.addEventListener('click', actualizarPresupuestoWeb);
}

let btnAnyadirGasto = document.getElementById('anyadirgasto');
if (btnAnyadirGasto) {
    btnAnyadirGasto.addEventListener('click', nuevoGastoWeb);
}

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