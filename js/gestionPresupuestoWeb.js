"use strict"

import * as gp from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
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
    gastoValor.textContent = objetoGasto.valor.toFixed(2);     
    gasto.append(gastoValor);


    const gastoEtiquetas = document.createElement("div");
    gastoEtiquetas.className = "gasto-etiquetas";
    gasto.append(gastoEtiquetas);    
    
    for (const etiqueta of objetoGasto.etiquetas) {
    const gastoEtiquetasEtiqueta = document.createElement("span");
    gastoEtiquetasEtiqueta.className = "gasto-etiquetas-etiqueta";
    gastoEtiquetasEtiqueta.textContent = etiqueta + " ";
    gastoEtiquetas.append(gastoEtiquetasEtiqueta);
}

    elemento.append(gasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const elemento = document.getElementById(idElemento);

    const agrupacion = document.createElement("div");
    agrupacion.className = "agrupacion";

    let textoPeriodo;
    if (periodo === "dia") {
        textoPeriodo = "día";
    } else if (periodo === "anyo") {
            textoPeriodo = "año";
    } else {
        textoPeriodo = "mes";
    }

    const h1 = document.createElement("h1");
    h1.textContent = "Gastos agrupados por " + textoPeriodo;
    agrupacion.append(h1);

    for (let [clave, valor] of Object.entries(agrup)) {
        const agrupacionDato = document.createElement("div");
        agrupacionDato.className = "agrupacion-dato";
        agrupacion.append(agrupacionDato);

        const agrupacionDatoClave = document.createElement("span");
        agrupacionDatoClave.className = "agrupacion-dato-clave";
        agrupacionDatoClave.textContent = clave + ": "; 

        const agrupacionDatoValor = document.createElement("span");
        agrupacionDatoValor.className = "agrupacion-dato-valor";
        agrupacionDatoValor.textContent = valor.toFixed(2) + "€"; 

        agrupacionDato.append(agrupacionDatoClave, agrupacionDatoValor);
    }

    elemento.append(agrupacion);
}

function repintar() {
    const presupuesto = gp.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);

    const gastosTotales = gp.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gastosTotales);

    const balanceTotal = gp.calcularBalance();
    mostrarDatoEnId("balance-total", balanceTotal);

    document.getElementById("listado-gastos-completo").innerHTML = "";

    const listadoGastos = gp.listarGastos();
    for (const gasto of listadoGastos) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb() {
    let nuevoPresupuesto = prompt("Introduce el nuevo prespuesto: ");
    nuevoPresupuesto = Number(nuevoPresupuesto);
    gp.actualizarPresupuesto(nuevoPresupuesto);
    repintar();
}

let botonActPres = document.getElementById("actualizarpresupuesto");
botonActPres.addEventListener('click', actualizarPresupuestoWeb);

function nuevoGastoWeb() {
    let descripcion = prompt("Introduce la descripción del nuevo gasto: ");

    let valor = prompt("Introduce el valor del nuevo gasto: ");
    valor = Number(valor);

    let fecha = prompt("Introduce la fecha (yyyy-mm-dd) del nuevo gasto: ");

    let etiquetasComas = prompt("Introduce las etiquetas del nuevo gasto separadas por comas: ");
    let etiquetas = etiquetasComas.split(',');

    let gasto = new gp.CrearGasto(descripcion, valor, fecha, ...etiquetas);

    gp.anyadirGasto(gasto);

    repintar();
}

let botonNuevoGasto = document.getElementById("anyadirgasto");
botonNuevoGasto.addEventListener('click', nuevoGastoWeb);

function EditarHandle() {
    this.handleEvent = function(evento) {
    let descripcion = prompt("Introduce la nueva descripción del gasto:");

    let valor = prompt("Escribe el nuevo valor del gasto:");
    valor = Number(valor);

    let fecha = prompt("Introduce la nueva fecha (yyyy-mm-dd) del gasto: ");

    let etiquetasComas = prompt("Introduce las neuvas etiquetas del gasto separadas por comas: ");
    let etiquetas = etiquetasComas.split(',');

    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarValor(valor);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...etiquetas);

    repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function(evento) {
        this.gasto.borrarGasto(this.gasto.idGasto);
        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function(evento) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

export {
    mostrarDatoEnId, 
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}