"use strict";

import * as gestionPresupuesto from './gestionPresupuesto.js';


function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
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
    for (const etiqueta of gasto.etiquetas) {
        let span = document.createElement('span');
        span.classList.add('gasto-etiquetas-etiqueta');
        span.textContent = etiqueta;

        let handleEtiqueta = new BorrarEtiquetasHandle();
        handleEtiqueta.gasto = gasto;
        handleEtiqueta.etiqueta = etiqueta;
        span.addEventListener('click', handleEtiqueta);

        divEtiquetas.append(span);
    }
    divGasto.append(divEtiquetas);

    let botonEditar = document.createElement('button');
    botonEditar.type = 'button';
    botonEditar.classList.add('gasto-editar');
    botonEditar.textContent = 'Editar';
    let handleEditar = new EditarHandle();
    handleEditar.gasto = gasto;
    botonEditar.addEventListener('click', handleEditar);
    divGasto.append(botonEditar);

    let botonBorrar = document.createElement('button');
    botonBorrar.type = 'button';
    botonBorrar.classList.add('gasto-borrar');
    botonBorrar.textContent = 'Borrar';
    let handleBorrar = new BorrarHandle();
    handleBorrar.gasto = gasto;
    botonBorrar.addEventListener('click', handleBorrar);
    divGasto.append(botonBorrar);

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
function repintar() {
    mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());
    document.getElementById('listado-gastos-completo').innerHTML = "";

    for (const gasto of gestionPresupuesto.listarGastos()) {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    }
}
function actualizarPresupuestoWeb() {
    let texto = prompt("Introduce el presupuesto: ");
    let presupuesto = Number(texto);
    gestionPresupuesto.actualizarPresupuesto(presupuesto);
    repintar();
}
function nuevoGastoWeb() {
    let descripcion = prompt("Introduce la descripción: ");
    let texto = prompt("Introduce el valor: ");
    let valor = Number(texto);
    let fecha = prompt("Introduce la fecha (yyyy-mm-dd): ");
    let textoEtiquetas = prompt("Introduce las etiquetas separadas por comas: ");
    let etiquetas = textoEtiquetas.split(",");

    let gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gestionPresupuesto.anyadirGasto(gasto);
    repintar();
}
function EditarHandle() {
    this.handleEvent = function () {
        let descripcion = prompt("Introduce la descripción: ", this.gasto.descripcion);
        let textoValor = prompt("Introduce el valor: ", this.gasto.valor);
        let fecha = prompt(
            "Introduce la fecha (yyyy-mm-dd): ",
            new Date(this.gasto.fecha).toISOString().substring(0, 10)
        );
        let textoEtiquetas = prompt(
            "Introduce las etiquetas separadas por comas: ",
            this.gasto.etiquetas
        );

        let valor = Number(textoValor);
        let etiquetas = textoEtiquetas.split(",");

        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);

        repintar();
    };
}

function BorrarHandle() {
    this.handleEvent = function () {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    };
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function () {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
}
document.getElementById("actualizarpresupuesto")
    .addEventListener("click", actualizarPresupuestoWeb);

document.getElementById("anyadirgasto")
    .addEventListener("click", nuevoGastoWeb);


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle
};